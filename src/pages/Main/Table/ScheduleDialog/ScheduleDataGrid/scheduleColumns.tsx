import { GridColDef } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Payments } from "../../../../../Models/Payments";

export function scheduleColumns() {
  function getDateMoment(date: Date) {
    return moment(date).format("DD.MM.YYYY");
  }
  const scheduleColumns: GridColDef<Payments>[] = [
    {
      field: "id_agreement",
      type: "number",
      width: 90,
    },
    {
      width: 90,
      field: "id",
      headerName: "id платежа",
      description: "id платежа в графике",
    },
    {
      width: 150,
      field: "pay_day",
      type: "date",
      valueGetter(params) {
        return getDateMoment(params.row.pay_day);
      },
    },
    {
      width: 150,
      field: "sum_owe",
      type: "number",
    },
    {
      field: "status",
    },
    {
      field: "user",
    },
  ];
  return scheduleColumns;
}
