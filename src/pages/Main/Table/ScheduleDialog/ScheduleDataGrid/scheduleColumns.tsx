import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import { Payments } from "../../../../../Models/Payments";
import { Delete, Refresh } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import deletePayment from "../../../../../api/SchedulePayments/deletePayment";
import { enqueueSnackbar } from "notistack";
import updateStatus from "../../../../../api/SchedulePayments/updateStatus";
import { ScheduleEventsClass, ScheduleEvents } from "../ScheduleDialog";
import { Can } from "../../../../../casl/casl";
import { Action, Subject } from "../../../../../casl/casl.factory";
import { dateColumnType } from "../../../../../utils/DateCol";
import getDateMoment from "../../../../../utils/getDateMoment";
import { DatePicker } from "@mui/x-date-pickers-pro";

export function scheduleColumns(
  refresh: VoidFunction,
  eventTarget: EventTarget
) {
  const scheduleColumns: GridColDef<Payments>[] = [
    {
      headerAlign: "center",
      headerName: "ID согл-я",
      field: "id_agreement",
      type: "number",
      width: 100,
      aggregable: false,
      editable: false,
    },
    {
      headerAlign: "center",
      width: 100,
      field: "id",
      headerName: "ID платежа",
      description: "id платежа в графике",
      type: "number",
      aggregable: false,
      editable: false,
    },
    {
      field: "pay_day",
      headerName: "День платежа",
      type: "Date",
      width: 100,
      editable: true,
      valueGetter(params) {
        return getDateMoment(params.row.pay_day);
      },
      renderEditCell(params) {
        return <DatePicker></DatePicker>;
      },
    },
    {
      headerAlign: "center",
      headerName: "Cумма платежа",
      width: 150,
      field: "sum_owe",
      align: "center",
      type: "number",
      editable: true,
    },
    {
      headerAlign: "center",
      headerName: "Осталось/Переплачено",
      width: 150,
      field: "sum_left",
      align: "center",
      type: "number",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "calc_id",
      width: 75,
      headerName: "Кол-во платежей",
      description: "Количество привязанных платежей к графику",
      valueGetter(params) {
        return params.row.Calcs?.map((i) => i.id_debt_calc).length;
      },
    },
    {
      aggregable: false,
      width: 100,
      headerName: "Статус",
      headerAlign: "center",
      field: "status",
      type: "boolean",
      align: "center",
    },
    {
      aggregable: false,
      width: 150,
      headerName: "Действия",
      headerAlign: "center",
      field: "actions",
      align: "center",
      type: "actions",
      getActions(params) {
        return [
          <Can I={Action.Create} a={Subject.AgreementToDebt}>
            <GridActionsCellItem
              label="Edit"
              icon={<EditIcon />}
              onClick={() => {
                eventTarget?.dispatchEvent(
                  new ScheduleEventsClass(
                    ScheduleEvents.onEditPayment,
                    params.row.id
                  )
                );
              }}
            />
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
            />
          </Can>,
          <Can I={Action.Permit} a={Subject.DebtCalc}>
            <GridActionsCellItem
              label="Обновить"
              icon={<Refresh />}
              onClick={() => {
                if (!params.row.id) {
                  return;
                }
                updateStatus({
                  id_agreement: params.row.id_agreement,
                  id_payment: params.row.id,
                }).subscribe(() => {
                  enqueueSnackbar("Платёж обновлен", {
                    variant: "info",
                    autoHideDuration: 1000,
                  });
                  refresh();
                });
              }}
            />
          </Can>,
        ];
      },
    },
  ];
  return scheduleColumns;
}
