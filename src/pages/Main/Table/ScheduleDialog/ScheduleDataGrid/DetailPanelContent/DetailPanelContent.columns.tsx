import { GridColDef } from "@mui/x-data-grid-premium";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";

export const detailPanelColumns: GridColDef<DebtCalcInstance>[] = [
  {
    field: "calc_date",
    align: "center",
    headerAlign: "center",
    headerName: "Дата платежа",
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
    valueGetter(params) {
      const t = params.row.purpose;
      return t;
    },
  },
  {
    field: "dt",
    align: "center",
    headerAlign: "center",
    headerName: "Дата занесения в кск",
    width: 150,
  },
];
