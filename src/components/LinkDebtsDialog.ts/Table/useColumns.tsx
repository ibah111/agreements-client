import { Debt } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import { Can } from "../../../casl/casl";
import { Action, Subject } from "../../../casl/casl.factory";
import DeleteButton from "./Toolbar/DeleteButton";
import PaymentsButton from "./Toolbar/Payments/PaymentsButton";

export default function useColumns(
  agreementId: number,
  refresh: VoidFunction,
  handleOpenAgreements: (debtId: number) => void
) {
  return React.useMemo<GridColDef<Debt>[]>(
    () => [
      {
        // ? main debt key
        align: "center",
        headerAlign: "center",
        headerName: "ID долга",
        field: "id",
        width: 100,
        type: "number",
      },
      {
        // ? person key
        align: "center",
        headerAlign: "center",
        headerName: "ID должника",
        field: "parent_id",
        width: 100,
        type: "number",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "contract",
        headerName: "№ КД",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "start_sum",
        headerName: "Начальная сумма",
        description: "Начальная сумма, необходимая к погашению (не изменяется)",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "debt_sum",
        headerName: "Остаток задолженности",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "name",
        headerName: "Название продукта",
      },
      {
        align: "center",
        headerAlign: "center",
        field: "StatusDict",
        headerName: "Статус долга",
        width: 150,
        valueOptions: [],
        valueGetter: (params) => {
          return params.row.StatusDict?.name;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "dsc",
        headerName: "Комментарий",
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
            debtId={params.row.id}
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
              debtId={params.row.id}
              agreementId={agreementId}
              refresh={refresh}
            />
          </Can>,
        ],
      },
    ],
    [agreementId, handleOpenAgreements, refresh]
  );
}
