import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import PaymentsIcon from "@mui/icons-material/Payments";
import { ScheduleLinkModel } from "./ScheduleLinkModel";
import { Tooltip } from "@mui/material";
import {
  EventScheduleDialog,
  ScheduleLinkDialogEvent,
} from "./ScheduleLinkControl";
import { Delete } from "@mui/icons-material";
import deleteScheduleLink from "../../../../../api/SchedulePayments/deleteSchedule";
interface props {
  DialogTarget: EventTarget;
  refresh: VoidFunction;
}
export function getColumns(props: props) {
  const columns: GridColDef<ScheduleLinkModel>[] = [
    {
      headerName: "ID графика",
      field: "id",
    },
    {
      headerName: "ID Долга",
      field: "id_debt",
      valueFormatter(params) {
        if (params.value === 0) return "График на все долги";
      },
    },
    {
      headerName: "КД",
      field: "contract",
      valueFormatter(params) {
        if (params.value) return `КД №${params.value}`;
      },
    },
    {
      headerName: "Тип графика",
      field: "schedule_type",
      valueFormatter(params) {
        const V = params.value;
        if (V === 1) return "Общий";
        if (V === 2) return "По КД";
      },
    },
    {
      headerName: "Действия",
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <Tooltip title={"Платежи"}>
          <GridActionsCellItem
            label="Schedule"
            icon={<PaymentsIcon />}
            onClick={() => {
              props.DialogTarget.dispatchEvent(
                new EventScheduleDialog(
                  ScheduleLinkDialogEvent.onOpenScheduleDialogCreate,
                  params.row.id
                )
              );
            }}
          />
        </Tooltip>,
        <Tooltip title={"Удалить график"}>
          <GridActionsCellItem
            label="DeleteSchedule"
            icon={<Delete />}
            onClick={() => {
              const id = params.row.id;
              deleteScheduleLink(id).subscribe(() => {
                props.refresh();
              });
            }}
          />
        </Tooltip>,
      ],
    },
  ];
  return columns.map<GridColDef<ScheduleLinkModel>>((i) => ({
    ...i,
    headerAlign: "center",
    align: "center",
    width: 150,
  }));
}
