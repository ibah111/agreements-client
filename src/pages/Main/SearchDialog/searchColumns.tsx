import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid-premium";
import { Results } from "../../../Reducer/Results";

export const searchColumns: GridColDef<Results>[] = [
  {
    headerName: "Ссылка на челоевка",
    description: "Ссылка на person",
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
    headerName: "Платеж",
    field: "is_confirmed",
    width: 50,
    type: "string",
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if ((params.value = 1)) {
        return "Принят";
      } else {
        return "Не принят";
      }
    },
  },
  {
    headerName: "Ответ банка",
    field: "is_cancel",
    width: 50,
    type: "string",
  },
  {
    headerName: "Дата в банке",
    field: "calc_date",
    type: "date",
    width: 100,
  },
];
