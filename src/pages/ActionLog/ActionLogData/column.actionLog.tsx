import { GridColDef } from "@mui/x-data-grid-premium";
import { ActionLogModel } from "../../../Models/RouterGridModels/ActionLog";
import getDateMoment from "../../../utils/getDateMoment";

export default function columnsActionLog() {
  const columns: GridColDef<ActionLogModel>[] = [
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "ID действия",
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
      valueFormatter(params) {
        /**
         * Action object
         */
        const obj = [
          {
            num: 1,
            action: "Создал",
          },
          {
            num: 2,
            action: "Изменил/Обновил",
          },
          {
            num: 3,
            action: "Удалил",
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
    },
    {
      headerAlign: "center",
      align: "center",
      width: 150,
      headerName: "Старое значение",
      field: "old_value",
      valueFormatter(params) {
        if (params.value === null) return "Пустое значение";
        // console.log(`id: ${params.id}, value: ${params.value}`);
        return params.value;
      },
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
  ];
  return columns;
}
