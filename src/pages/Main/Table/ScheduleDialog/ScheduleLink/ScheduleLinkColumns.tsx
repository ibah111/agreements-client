import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import PaymentsIcon from "@mui/icons-material/Payments";
import { ScheduleLinkModel } from "./ScheduleLinkModel";
import { Tooltip } from "@mui/material";
import {
  EventScheduleDialog,
  ScheduleLinkDialogEvent,
} from "./ScheduleLinkControl";
interface props {
  DialogTarget: EventTarget;
}
export function getColumns(p: props) {
  const columns: GridColDef<ScheduleLinkModel>[] = [
    {
      headerName: "ID графика",
      field: "id",
    },
    {
      headerName: "ID Долга",
      field: "id_debt",
    },
    {
      headerName: "КД",
      field: "contract",
      valueFormatter(params) {
        return `КД №${params.value}`;
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
              p.DialogTarget.dispatchEvent(
                new EventScheduleDialog(
                  ScheduleLinkDialogEvent.onOpenScheduleDialogCreate,
                  params.row.id
                )
              );
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
