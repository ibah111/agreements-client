import { GridColDef } from "@mui/x-data-grid-premium";
import {
  ActionLogModel,
  obj_t,
} from "../../../Models/RouterGridModels/ActionLog";
import getDateMoment from "../../../utils/getDateMoment";

export default function columnsActionLog() {
  const columns: GridColDef<ActionLogModel>[] = [
    {
      headerAlign: "center",
      align: "center",
      width: 100,
      headerName: "ID действия",
      field: "id",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 100,
      headerName: "ID строки",
      field: "row_id",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Тип действия",
      field: "actionType",
      valueFormatter(params) {
        const obj = [
          {
            num: 1,
            action: "Создано соглашение",
          },
          {
            num: 2,
            action: "Изменено поле",
          },
          {
            num: 3,
            action: "Удалил соглашение",
          },
        ];
        const ret = obj.filter((item) => item.num === params.value);
        return ret.map((item) => item.action);
      },
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Поле",
      field: "field",
      valueGetter(params) {
        const cell_value = params.value;
        return obj_t
          .filter((item) => item.field === cell_value)
          .map((item) => item.name);
      },
    },
    {
      headerAlign: "center",
      align: "center",
      width: 400,
      headerName: "Старое значение",
      field: "old_value",
    },
    {
      headerAlign: "center",
      align: "center",
      width: 400,
      headerName: "Новое значение",
      field: "new_value",
      valueGetter(params) {
        return params.value;
      },
    },
    {
      field: "createdAt",
      headerName: "Создано",
      align: "center",
      headerAlign: "center",
      width: 150,
      type: "Date",
      valueGetter(params) {
        const value = params.row.createdAt;
        return getDateMoment(value);
      },
    },
    {
      field: "updatedAt",
      headerName: "Обновлено",
      align: "center",
      headerAlign: "center",
      width: 150,
      type: "Date",
      valueGetter(params) {
        const value = params.row.updatedAt;
        return getDateMoment(value);
      },
    },
    {
      field: "user",
      headerName: "Пользователь",
      headerAlign: "center",
      align: "center",
    },
  ];
  return columns;
}
