import { GridColDef } from "@mui/x-data-grid-premium";
import { Results } from "../../../Reducer/Results";

export const searchColumns: GridColDef<Results>[] = [
  {
    headerName: "Ссылка на person",
    field: "r_person_id",
    width: 150,
    type: "number",
  },
  {
    headerName: "Имя",
    field: "name",
    width: 150,
    type: "string",
  },
  {
    headerName: "КД Кредитный договор",
    field: "KD",
    width: 150,
    type: "string",
  },
  {
    headerName: "ID Долга",
    field: "r_debt_id",
    width: 150,
    type: "date",
  },
  {
    headerName: "ID Реестра",
    field: "r_portfolio_id",
    width: 150,
    type: "date",
  },
];
