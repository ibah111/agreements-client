import { Box, Grid, Slide, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid-premium";

export default function AgreementTable() {
  const columns: GridColDef[] = [
    { headerName: "id", field: "ID", width: 90 },
    {
      headerName: "Дате последней проверки",
      field: "last_check_date",
      width: 150,
      editable: true,
    },
    {
      headerName: "Дата заключения",
      field: "conclusion_date",
      width: 150,
      editable: true,
    },
    {
      headerName: "ФИО должника",
      field: "FIO_debter",
      sortable: false,
      width: 160,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      headerName: "Дата рождения",
      field: "birth_date",
      width: 150,
      editable: true,
    },
    {
      headerName: "КД",
      field: "KD",
      width: 150,
      editable: true,
    },
    {
      headerName: "ID дела",
      field: "id_deal",
      width: 150,
      editable: true,
    },
    {
      headerName: "Проверено",
      field: "Check",
      width: 150,
      editable: true,
    },
    {
      headerName: "Реестр",
      field: "Register",
      width: 150,
      editable: true,
    },
    {
      headerName: "Назначение",
      field: "purpose",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма задолженности, переданная банком",
      field: "debt_bank_summ",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма задолженности по судебному акту в пользу банка",
      field: "court_sum",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма задолженности ОД взысканная в пользу НБК /Вымпел ",
      field: "debt_sum",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма задолженности по пересчету",
      field: "recalculation_sum",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма задолженности к погашению по соглашению с дисконтом",
      field: "law_act_debt",
      width: 150,
      editable: true,
    },
    {
      headerName: "Дисконт",
      field: "discount_sum",
      width: 150,
      editable: true,
    },
    {
      headerName: "Дата платежа по соглашению",
      field: "pay_date",
      width: 150,
      editable: true,
    },
    {
      headerName: "Cумма первого платежа по соглашению",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма платежа каждого месяца",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма последнего платежа",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Сумма платежей после соглашения",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Остаток основного долга",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Наличие ИД в исполнении",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Наличие ИД в регистраторе",
      field: "reg_doc",
      width: 150,
      editable: true,
    },
    {
      headerName: "Наличие ИД в архиве",
      field: "finish_doc",
      width: 150,
      editable: true,
    },
    {
      headerName: "Дата получения листа",
      field: "get_list_date",
      width: 150,
      editable: true,
    },
    {
      headerName: "Действия для получения или предъявления листа",
      field: "actions_for_ge",
      width: 150,
      editable: true,
    },
    {
      headerName: "Количество кредитов в реестрах",
      field: "credit_mount",
      width: 150,
      editable: true,
    },
    {
      headerName: "Количество поручителей",
      field: "count_debt_guarantor",
      width: 150,
      editable: true,
    },
    {
      headerName: "Имущество",
      field: "inventory",
      width: 150,
      editable: true,
    },
    {
      headerName: "Дополнительная информация",
      field: "additional_information",
      width: 150,
      editable: true,
    },
    {
      headerName: "Комментарий",
      field: "comment",
      width: 150,
      editable: true,
    },
    {
      headerName: "Статус долга",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "ФИО Взыскателя",
      field: "month_pay_day",
      width: 150,
      editable: true,
    },
    {
      headerName: "Ссылка на задачу",
      field: "task_link",
      width: 150,
      editable: true,
    },
  ];
  const rows = [
    { id: "", lastName: "", firstName: "", age: "" },
    { id: "", lastName: "", firstName: "", age: "" },
  ];
  return (
    <>
      <Box>
        <Grid item container alignItems="center">
          <Typography>Agreement Table</Typography>
        </Grid>

        <DataGrid rows={rows} columns={columns} />
      </Box>
    </>
  );
}
