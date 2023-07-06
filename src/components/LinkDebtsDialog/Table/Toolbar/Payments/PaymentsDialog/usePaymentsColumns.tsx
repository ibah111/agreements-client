import { GridColDef } from "@mui/x-data-grid-premium";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
const columns: GridColDef<DebtCalcInstance>[] = [
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
    valueGetter: (params) => (params.row.dt ? params.row.dt.toDate() : null),
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
    valueGetter: (params) => {
      return params.row.dsc;
    },
  },
  {
    align: "center",
    headerAlign: "center",
    headerName: "Назначение платежа",
    type: "string",
    field: "PurposeDict",
    width: 400,
    valueGetter: (params) => {
      if (params.row.PurposeDict?.name) return params.row.PurposeDict?.name;
    },
  },
];
export default function usePaymentsColumns() {
  return columns;
}
