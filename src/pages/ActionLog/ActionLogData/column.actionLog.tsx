import { GridColDef } from "@mui/x-data-grid-premium";
import { ActionLogModel } from "../../../Models/RouterGridModels/ActionLog";

export default function columnsActionLog() {
  const columns: GridColDef<ActionLogModel>[] = [
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "ID",
      field: "id",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "ID строки",
      field: "row_id",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Тип действия",
      field: "actionType",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Поле",
      field: "Ответственый",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Старое значение",
      field: "old_value",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Новое значение",
      field: "new_value",
    },
    {
      field: "createdAt",
      headerName: "Создано",
      align: "center",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Обновлено",
      align: "center",
      headerAlign: "center",
      width: 150,
    },
  ];
  return columns;
}
