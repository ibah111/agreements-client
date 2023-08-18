import { GridColDef } from "@mui/x-data-grid-premium";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import useDict from "../../../../../../Hooks/useDict";
import React from "react";

export default function useDetailCols() {
  const purposes = useDict(130);
  const selectPurposes = React.useMemo(
    () =>
      purposes.map((item) => ({
        value: item.code,
        label: item.name,
      })),
    [purposes]
  );
  const detailPanelColumns = React.useMemo<GridColDef<DebtCalcInstance>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "calc_date",
        align: "center",
        headerAlign: "center",
        headerName: "Дата платежа",
        width: 150,
        type: "date",
        valueGetter(params) {
          return params.row.calc_date ? params.row.calc_date.toDate() : null;
        },
      },
      {
        field: "sum",
        align: "center",
        headerAlign: "center",
        headerName: "Сумма",
        width: 150,
      },
      {
        field: "purpose",
        align: "center",
        headerAlign: "center",
        headerName: "Назначение",
        width: 150,
        type: "singleSelect",
        valueOptions: selectPurposes,
      },
      {
        field: "dt",
        align: "center",
        headerAlign: "center",
        headerName: "Дата занесения в КСК",
        width: 150,
        type: "date",
        valueGetter(params) {
          return params.row.dt ? params.row.dt.toDate() : null;
        },
      },
    ],
    [selectPurposes]
  );
  return { detailPanelColumns };
}
