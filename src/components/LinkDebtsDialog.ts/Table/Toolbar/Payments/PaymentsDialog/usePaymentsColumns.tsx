import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import { dateColumnType } from "../../../../../../utils/DateCol";

export default function usePaymentsColumns() {
  return React.useMemo<GridColDef<DebtCalcInstance>[]>(
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
        field: "dt",
        ...dateColumnType,
        headerName: "Дата платежа",
        width: 200,
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Подтверждение",
        field: "is_confirmed",
        width: 250,
        type: "boolean",
        valueGetter: (params) =>
          params.row.is_confirmed === 1 && params.row.is_cancel === 0,
      },
    ],
    []
  );
}
