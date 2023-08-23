import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import { User } from "../../../api/TableApi's/Admin/getAdminDetails";
import { Tooltip } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { enqueueSnackbar } from "notistack";
import getDateMoment from "../../../utils/getDateMoment";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import deleteUser from "../../../api/TableApi's/Admin/deleteUser";
import { AdminEventDialog, AdminEvents } from "./AdminTable";

interface colsProps {
  refresh: VoidFunction;
  eventTarget: EventTarget;
}

export default function columnsAdmin(props: colsProps) {
  const cols: GridColDef<User>[] = [
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "ID пользователя",
    },
    {
      field: "login",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Логин",
      type: "string",
    },
    {
      field: "role",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Роль",
      type: "string",
      valueGetter(params) {
        return params.row.Roles?.map((item) => item.title);
      },
    },
    {
      field: "createdAt",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Когда создан",
      type: "Date",
      valueGetter(params) {
        const date = params.value;
        return getDateMoment(date);
      },
    },
    {
      field: "updatedAt",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Последнее обновление",
      type: "Date",
      valueGetter(params) {
        const date = params.value;
        return getDateMoment(date);
      },
    },
    {
      field: "type",
      type: "actions",
      headerName: "Действия",
      getActions: (params) => [
        <Tooltip title={"Добавить роль"}>
          <GridActionsCellItem
            label="addRole"
            icon={<AddModeratorIcon />}
            onClick={() => {
              props.eventTarget.dispatchEvent(
                new AdminEventDialog(AdminEvents.onAddRoleDialog, params.row.id)
              );
            }}
          />
        </Tooltip>,
        <Tooltip title={"Удалить"}>
          <GridActionsCellItem
            label="Delete"
            icon={<PersonRemoveIcon />}
            onClick={() => {
              deleteUser(params.row.id!).subscribe(() =>
                enqueueSnackbar("Пользователь удален", {
                  variant: "warning",
                  autoHideDuration: 2000,
                })
              );
              props.refresh();
            }}
          />
        </Tooltip>,
      ],
    },
  ];
  return cols;
}
