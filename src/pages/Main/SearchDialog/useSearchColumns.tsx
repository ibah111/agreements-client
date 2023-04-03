import { Debt } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import AddAgreementAction from "./Actions/AddAgreement";

export default function useSearchColumns(
  setOpenAgreementDialog: React.Dispatch<React.SetStateAction<boolean>>
) {
  return React.useMemo<GridColDef<Debt>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number" },
      { field: "contract", headerName: "КД", width: 120 },
      //todo dev
      { field: "parent_id", headerName: "ссылка на Pperson" },
      {
        field: "Person.fio",
        headerName: "ФИО",
        width: 200,
        valueGetter: (params) => params.row.Person?.fio,
      },
      {
        field: "debt_sum",
        headerName: "Сумма долга",
        type: "number",
      },
      {
        field: "debt_dt",
        headerName: "Дата",
        type: "date",
        valueGetter(params) {
          return new Date(params.row.debt_dt);
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
            setOpen={setOpenAgreementDialog}
            debt={params.row}
          />,
        ],
      },
    ],
    [setOpenAgreementDialog]
  );
}
