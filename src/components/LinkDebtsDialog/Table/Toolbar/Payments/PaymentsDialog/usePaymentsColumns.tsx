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
        headerName: "Дата платежа",
        type: "date",
        valueGetter: (params) =>
          params.row.calc_date ? params.row.calc_date.toDate() : null,
        field: "calc_date",
        width: 150,
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Дата занесения в КСК",
        type: "date",
        valueGetter: (params) =>
          params.row.dt ? params.row.dt.toDate() : null,
        field: "dt",
        width: 150,
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
        width: 250,
        valueOptions: selectPurposes,
      },
      {
        align: "center",
        headerAlign: "center",
        headerName: "Подтвержден?",
        width: 150,
        field: "is_confirmed",
        valueGetter(params) {
          if (params.row.is_confirmed === 1) {
            return "Да";
          } else return "Нет";
        },
      },
    ],
    [selectPurposes]
  );
  return columns;
}
