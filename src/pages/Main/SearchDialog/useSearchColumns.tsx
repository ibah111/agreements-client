import { Debt, Person } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import AddAgreementAction from "./Actions/AddAgreement";

export default function useSearchColumns(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPerson: React.Dispatch<React.SetStateAction<Person>>
) {
  return React.useMemo<GridColDef<Debt>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number" },
      { field: "contract", headerName: "КД", width: 120 },
      { field: "parent_id", headerName: "ID должника", width: 60 },
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
        //valueFormatter: (params) => `${params.value}₽`,
      },
      {
        field: "debt_dt",
        headerName: "Дата",
        type: "date",
        valueGetter: (params) => {
          return params.row.debt_dt.toDate();
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
    [setOpen, setPerson]
  );
}
