import { DebtCalc } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";

export default function usePaymentsColumns() {
  return React.useMemo<GridColDef<DebtCalc>[]>(
    () => [
      {
        align: "center",
        headerAlign: "center",
        headerName: "ID платежа",
        field: "id",
        width: 150,
        type: "number",
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "ID должника",
        field: "parent_id",
        width: 150,
        type: "number",
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Сумма",
        field: "sum",
        width: 200,
        type: "number",
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Дата платежа",
        field: "dt",
        width: 100,
        type: "date",
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Подтверждение",
        field: "is_confirmed",
        width: 150,
        type: "number",
      },
    ],
    []
  );
}
