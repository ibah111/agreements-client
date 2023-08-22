import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import { User_Role } from "../../../api/TableApi's/Admin/getAdminDetails";
import { Tooltip } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { enqueueSnackbar } from "notistack";
import getDateMoment from "../../../utils/getDateMoment";

export default function columnsAdmin() {
  const cols: GridColDef<User_Role>[] = [
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "ID пользователя",
    },
    {
      field: "user_id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Логин",
      type: "string",
      valueGetter(params) {
        if (params.row.User?.login === "guest") return "Гостевой профиль";
        return params.row.User?.login;
      },
    },
    {
      field: "role_id",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "Роль",
      valueGetter(params) {
        return params.row.Role?.title;
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
      /**
       * copy date formattting
       */
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
        <Tooltip title={"Удалить"}>
          <GridActionsCellItem
            label="Delete"
            icon={<PersonRemoveIcon />}
            onClick={() => {
              const user_id = params.row.user_id;
              const role_id = params.row.role_id;
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
