import { GridColDef } from "@mui/x-data-grid-premium";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import useDict from "../../../../../../Hooks/useDict";
import React from "react";
import moment from "moment";

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
        align: "center",
        headerAlign: "center",
        headerName: "Дата платежа",
        type: "Date",
        valueGetter(params) {
          if (params.row.calc_date === null) return;
          return moment(params.row.calc_date).format("DD.MM.YYYY");
        },
        field: "calc_date",
        width: 150,
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
        align: "center",
        headerAlign: "center",
        headerName: "Дата занесения в КСК",

        valueGetter(params) {
          return moment(params.row.dt).format("DD.MM.YYYY");
        },
        field: "dt",
        width: 150,
      },
    ],
    [selectPurposes]
  );
  return { detailPanelColumns };
}
