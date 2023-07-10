import { GridColDef } from "@mui/x-data-grid-premium";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import React from "react";
import useDict from "../../../../../../Hooks/useDict";

export default function usePaymentsColumns() {
  const purposes = useDict(130);
  const selectPurposes = React.useMemo(
    () =>
      purposes.map((item) => ({
        value: item.code,
        label: item.name,
      })),
    [purposes]
  );
  const columns = React.useMemo<GridColDef<DebtCalcInstance>[]>(
    () => [
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
        headerName: "Дата",
        type: "date",
        valueGetter: (params) =>
          params.row.dt ? params.row.dt.toDate() : null,
        field: "dt",
        width: 200,
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Комментарий",
        type: "string",
        field: "dsc",
        width: 400,
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Назначение платежа",
        type: "singleSelect",
        field: "purpose",
        width: 400,
        valueOptions: selectPurposes,
      },
    ],
    [selectPurposes]
  );
  return columns;
}
