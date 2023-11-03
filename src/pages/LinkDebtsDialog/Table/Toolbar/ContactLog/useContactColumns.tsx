import { ContactLog } from "@contact/models";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import { dateColumnType } from "../../../../../utils/DateCol";
import moment from "moment";
import { Tooltip, Typography } from "@mui/material";
import { keysEnum, triggerEvent } from "./testUtils/useControl";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";

export default function useContactColumns(eventTarget: EventTarget) {
  const columns: GridColDef<ContactLog>[] = [
    {
      field: "r_debt_id",
      headerName: "Долг",
      type: "number",
    },
    {
      field: "r_phone_id",
      headerName: "Телефон",
      type: "actions",
      width: 150,
      valueGetter(params) {
        return params.row.Phone?.number2;
      },
      renderCell(params) {
        return (
          <>
            {params.formattedValue}
            <Tooltip title={<Typography>Информация о телефоне</Typography>}>
              <GridActionsCellItem
                label="phone-info"
                onClick={() => triggerEvent(eventTarget, keysEnum.phoneOpen)}
                icon={<PhoneIcon />}
              />
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "dsc",
      headerName: "Комментарий",
      renderCell(params) {
        return (
          <Tooltip title={<Typography>{params.value}</Typography>}>
            {params.value}
          </Tooltip>
        );
      },
    },
    {
      field: "typ",
      headerName: "Тип",
    },
    {
      field: "r_reg_user_id",
      headerName: "Пользователь",
    },
    {
      ...dateColumnType,
      field: "reg_dt",
      headerName: "Дата регистрации",
      valueGetter(params) {
        if (params.row.reg_dt === null) return;
        return moment(params.row.reg_dt).format("DD.MM.YYYY");
      },
    },
    {
      field: "r_debt_guarantor_id",
      headerName: "Поручитель",
      valueGetter(params) {
        return params.row.DebtGuarantor?.fio || "Поручитель не указан";
      },
      renderCell(params) {
        return (
          <>
            {params.formattedValue}
            <Tooltip title={<Typography>Информация о поручителе</Typography>}>
              <GridActionsCellItem
                label="phone-info"
                onClick={() =>
                  triggerEvent(eventTarget, keysEnum.guarantorOpen)
                }
                icon={<GroupIcon />}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];
  return columns.map<GridColDef<ContactLog>>((item) => ({
    ...item,
    width: 150,
    headerAlign: "center",
    align: "center",
  }));
}
