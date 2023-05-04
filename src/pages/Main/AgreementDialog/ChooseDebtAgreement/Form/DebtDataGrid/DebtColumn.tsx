import { Debt } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";

//todo SQL = DEBT
export const debtColumns: GridColDef<Debt>[] = [
  {
    // ? main debt key
    align: "center",
    headerAlign: "center",
    headerName: "ID долга",
    field: "id",
    width: 100,
    type: "number",
  },
  {
    // ? person key
    align: "center",
    headerAlign: "center",
    headerName: "id Персоны🌞",
    field: "parent_id",
    width: 100,
    type: "number",
  },
  {
    align: "center",
    headerAlign: "center",
    width: 150,
    field: "contract",
    headerName: "№ КД",
  },
  {
    align: "center",
    headerAlign: "center",
    width: 150,
    field: "start_sum",
    headerName: "Начальная сумма",
    description: "Начальная сумма, необходимая к погашению (не изменяется)",
  },
];
