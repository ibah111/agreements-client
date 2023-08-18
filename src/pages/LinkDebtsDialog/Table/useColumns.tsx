import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import { Can } from "../../../casl/casl";
import { Action, Subject } from "../../../casl/casl.factory";
import DeleteButton from "./Toolbar/DeleteButton";
import PaymentsButton from "./Toolbar/Payments/PaymentsButton";
import AgreementDebtsLink from "../../../Models/AgreementDebtLink";
import moment from "moment-timezone";
import useAsyncMemo from "../../../utils/asyncMemo";
import getPortfolio from "../../../api/getPortfolio";
import useDict from "../../../Hooks/useDict";

export default function useColumns(
  agreementId: number,
  refresh: VoidFunction,
  handleOpenAgreements: (debtId: number) => void
) {
  const dict = useDict(6);
  const portfolios = useAsyncMemo(getPortfolio, [], []);
  return React.useMemo<GridColDef<AgreementDebtsLink>[]>(
    () => [
      {
        align: "center",
        headerAlign: "center",
        field: "id_debt",
        headerName: "ID долга",
        type: "number",
        valueGetter(params) {
          return params.row.id_debt;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        field: "payable_status",
        headerName: "Плат.статус",
        type: "boolean",
        valueGetter(params) {
          return params.row.payable_status;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        field: "contract",
        headerName: "КД",
        valueGetter(params) {
          return params.row.contract;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Дата посл.платёж",
        field: "last_payment_date",
        type: "Date",
        valueGetter(params) {
          if (params.row.last_payment_date === null) return;
          return moment(params.row.last_payment_date).format("DD.MM.YYYY");
        },
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Посл.платёж",
        field: "last_payment",
        type: "number",
        valueGetter(params) {
          return params.row.last_payment;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Дата перв.платежа",
        field: "first_payment_date",
        type: "Date",
        valueGetter(params) {
          if (params.row.first_payment_date === null) return;
          return moment(params.row.first_payment_date).format("DD.MM.YYYY");
        },
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Перв.платеж",
        field: "first_payment",
        type: "number",
        valueGetter(params) {
          return params.row.first_payment;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Портфель",
        field: "portfolio",
        valueFormatter(params) {
          const port_name = portfolios.filter(
            (item) => item.id === params.value
          );
          return port_name.map((item) => item.name);
        },
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Статус",
        field: "status",
        valueGetter(params) {
          const status = params.row.status;
          const status_name = dict
            .filter((item) => item.code === status)
            .map((item) => item.name);
          return status_name;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        width: 200,
        field: "Payments",
        headerName: "Платежи",
        description: "Платежи",
        type: "actions",
        getActions: (params) => [
          <PaymentsButton
            debtId={params.row.id_debt}
            refresh={refresh}
            handleOpen={handleOpenAgreements}
          />,
        ],
      },
      {
        align: "center",
        headerAlign: "center",
        width: 200,
        field: "Delete",
        headerName: "Удалить связь",
        description: "Удалить",
        type: "actions",
        getActions: (params) => [
          <Can I={Action.Delete} a={Subject.Agreement}>
            <DeleteButton
              debtId={params.row.id_debt}
              agreementId={params.row.id_agreement}
              refresh={refresh}
            />
          </Can>,
        ],
      },
    ],
    [dict, handleOpenAgreements, portfolios, refresh]
  );
}
