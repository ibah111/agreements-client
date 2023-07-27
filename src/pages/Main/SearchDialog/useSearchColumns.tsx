import { Person } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import DebtInstance from "../../../Models/Debt";
import AddAgreementAction from "./Actions/AddAgreementAction";
import getPortfolio from "../../../api/getPortfolio";
import useAsyncMemo from "../../../utils/asyncMemo";

export default function useSearchColumns(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPerson: React.Dispatch<React.SetStateAction<Person>>
) {
  const portfolios = useAsyncMemo(getPortfolio, [], []);
  return React.useMemo<GridColDef<DebtInstance>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number" },
      { field: "parent_id", headerName: "ID должника", width: 60 },
      { field: "contract", headerName: "КД", width: 120 },
      {
        field: "Person.fio",
        headerName: "ФИО",
        width: 200,
        valueGetter: (params) => {
          return params.row.Person?.fio;
        },
      },
      {
        field: "debt_sum",
        headerName: "Сумма долга",
        type: "number",
        valueFormatter: (params) => `${params.value}₽`,
      },
      {
        field: "name",
        headerName: "Название продукта",
      },
      {
        headerName: "Портфель",
        field: "r_portfolio_id",
        valueFormatter(params) {
          const port = portfolios.filter((item) => item.id === params.value);
          return port.map((item) => item.name);
        },
      },
      {
        field: "status",
        headerName: "Статус долга",
        valueGetter: (params) => {
          return params.row?.StatusDict?.name;
        },
      },
      {
        field: "actions",
        headerAlign: "center",
        headerName: "Действия",
        align: "center",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <AddAgreementAction
            setPerson={setPerson}
            setOpen={setOpen}
            debt={params.row}
          />,
        ],
      },
    ],
    [portfolios, setOpen, setPerson]
  );
}
