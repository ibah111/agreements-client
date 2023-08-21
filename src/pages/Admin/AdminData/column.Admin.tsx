import { GridColDef } from "@mui/x-data-grid-premium";
import { AdminModel } from "../../../Models/RouterGridModels/Admin";

export default function columnsAdmin() {
  const cols: GridColDef<AdminModel>[] = [
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "ID",
    },
    {
      field: "user_id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Пользователь",
    },
    {
      field: "role_id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Роль",
    },
    {
      field: "createdAt",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Когда создан",
    },
    {
      field: "updatedAt",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Последнее обновление",
    },
  ];
  return cols;
}
