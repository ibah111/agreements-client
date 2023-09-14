import { GridColDef } from "@mui/x-data-grid-premium";

import { ScheduleLinkModel } from "./ScheduleLinkModel";

export function getColumns() {
  const columns: GridColDef<ScheduleLinkModel>[] = [
    {
      headerName: "ID Долга",
      field: "id_debt",
    },
    {
      headerName: "ID графика",
      field: "id_schedule",
    },
    {
      headerName: "КД",
      field: "contract",
    },
    {
      headerName: "Тип графика",
      field: "schedule_type",
    },
    {
      headerName: "Действия",
      field: "actions",
      type: "actions",
    },
  ];
  return columns.map<GridColDef<ScheduleLinkModel>>((i) => ({
    ...i,
    headerAlign: "center",
    align: "center",
  }));
}
