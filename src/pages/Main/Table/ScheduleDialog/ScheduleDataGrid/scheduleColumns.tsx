import { GridColDef } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Payments } from "../../../../../Models/Payments";

export function scheduleColumns() {
  function getDateMoment(date: Date) {
    return moment(date).format("DD.MM.YYYY");
  }
  const scheduleColumns: GridColDef<Payments>[] = [
    {
      headerAlign: "center",
      headerName: "ID согл-я",
      field: "id_agreement",
      type: "number",
      width: 100,
    },
    {
      headerAlign: "center",
      width: 100,
      field: "id",
      headerName: "ID платежа",
      description: "id платежа в графике",
      type: "number",
    },
    {
      headerAlign: "center",
      headerName: "День платежа",
      width: 150,
      field: "pay_day",
      type: "date",
      valueGetter(params) {
        return getDateMoment(params.row.pay_day);
      },
    },
    {
      headerAlign: "center",
      headerName: "Cумма платежа",
      width: 150,
      field: "sum_owe",
      type: "number",
    },
    {
      width: 70,
      headerName: "Статус",
      field: "status",
      type: "boolean",
    },
    {
      headerName: "Пользователь",
      description: "Кто создал внёс график",
      field: "user",
      type: "number",
      valueGetter(params) {},
    },
  ];
  return scheduleColumns;
}
