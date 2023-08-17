import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Payments } from "../../../../../Models/Payments";
import { Delete } from "@mui/icons-material";
import deletePayment from "../../../../../api/SchedulePayments/deletePayment";
import { enqueueSnackbar } from "notistack";

export function scheduleColumns(refresh: VoidFunction) {
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
      align: "center",
      type: "Date",
      valueGetter(params) {
        return getDateMoment(params.row.pay_day);
      },
    },
    {
      headerAlign: "center",
      headerName: "Cумма платежа",
      width: 150,
      field: "sum_owe",
      align: "center",
      type: "number",
    },
    {
      width: 100,
      headerName: "Статус",
      headerAlign: "center",
      field: "status",
      type: "boolean",
      align: "center",
    },
    {
      width: 150,
      headerName: "Действия",
      headerAlign: "center",
      field: "actions",
      align: "center",
      type: "actions",
      getActions(params) {
        return [
          <GridActionsCellItem
            label="Удалить"
            icon={<Delete />}
            onClick={() => {
              if (!params.row.id) return;
              deletePayment(params.row.id).subscribe(() => {
                enqueueSnackbar(`Удалён платёж ${params.row.id}`, {
                  variant: "warning",
                  autoHideDuration: 3500,
                });
                refresh();
              });
            }}
          />,
        ];
      },
    },
  ];
  return scheduleColumns;
}
