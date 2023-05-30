import { GridColDef } from "@mui/x-data-grid-premium";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
const columns: GridColDef<DebtCalcInstance>[] = [
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
    headerName: "Дата",
    field: "dt",
    width: 200,
  },
];
export default function usePaymentsColumns() {
  return columns;
}
