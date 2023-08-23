import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import { User } from "../../../api/TableApi's/Admin/getAdminDetails";
import { Tooltip } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { enqueueSnackbar } from "notistack";
import getDateMoment from "../../../utils/getDateMoment";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

export default function columnsAdmin() {
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
            onClick={() => {}}
          />
        </Tooltip>,
        <Tooltip title={"Удалить"}>
          <GridActionsCellItem
            label="Delete"
            icon={<PersonRemoveIcon />}
            onClick={() => {
              const user_id = params.row;
              const role_id = params.row;
              enqueueSnackbar("this method must delete user", {
                autoHideDuration: 1000,
              });
              alert(`user_id: ${user_id}, role_id: ${role_id}`);
            }}
          />
        </Tooltip>,
      ],
    },
  ];
  return cols;
}
