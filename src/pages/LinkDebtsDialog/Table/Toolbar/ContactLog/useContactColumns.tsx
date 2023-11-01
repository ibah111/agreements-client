import { ContactLog } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import { dateColumnType } from "../../../../../utils/DateCol";
import moment from "moment";
import { Tooltip, Typography } from "@mui/material";

export default function useContactColumns() {
  const columns: GridColDef<ContactLog>[] = [
    {
      field: "r_debt_id",
      headerName: "Долг",
    },
    {
      field: "r_phone_id",
      headerName: "Телефон",
      valueGetter(params) {
        return params.row.Phone?.number;
      },
      renderCell(params) {
        return (
          <Tooltip title={<Typography>{params.value}</Typography>}>
            {params.value}
          </Tooltip>
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
        return params.row.DebtGuarantor?.fio || "Поручитель на указан";
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
