import { GridColumns } from "@mui/x-data-grid-premium";
import { Agreement } from "../../../../Reducer/Agreement";

export default function getColumns(refresh: () => void) {
  const columns: GridColumns<Agreement> = [
    { headerName: "ID", field: "id", width: 90, type: "number" },
    {
      headerName: "Дате последней проверки",
      field: "last_check_date",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      headerName: "Дата заключения",
      field: "conclusion_date",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      headerName: "ФИО должника",
      field: "name",
      sortable: false,
      width: 160,
      editable: false,
      type: "string",
      valueGetter: (params) => {
        return params.row.LawAct.Person?.fio;
      },
    },
    {
      headerName: "Дата рождения",
      field: "birth_date",
      width: 150,
      editable: true,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row.LawAct.Person?.birth_date);
      },
    },
    {
      headerName: "КД",
      field: "KD",
      width: 150,
      editable: true,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.contract;
      },
    },
    {
      headerName: "ID дела",
      field: "r_law_act_id",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Проверено",
      field: "check",
      width: 150,
      editable: true,
      type: "boolean",
    },
    {
      headerName: "Реестр",
      field: "register",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Назначение",
      field: "purpose",
      width: 150,
      editable: true,
      type: "singleSelect",
    },
    {
      headerName: "Сумма задолженности, переданная банком",
      field: "debt_bank_summ",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма задолженности по судебному акту в пользу банка",
      field: "court_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма задолженности ОД взысканная в пользу НБК /Вымпел ",
      field: "debt_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма задолженности по пересчету",
      field: "recalculation_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма задолженности к погашению по соглашению с дисконтом",
      field: "law_act_debt",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Дисконт",
      field: "discount_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Дата платежа по соглашению",
      field: "pay_date",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Cумма первого платежа по соглашению",
      field: "sum_first_payment",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма платежа каждого месяца",
      field: "sum_every_month",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма последнего платежа",
      field: "sum_last_payment",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма платежей после соглашения",
      field: "sum_after_conclusion",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Остаток основного долга",
      field: "sum_left_payment",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Наличие ИД в исполнении",
      field: "reg_doc_action",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Наличие ИД в регистраторе",
      field: "reg_doc",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Наличие ИД в архиве",
      field: "finish_doc",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Дата получения листа",
      field: "get_list_date",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      headerName: "Действия для получения или предъявления листа",
      field: "actions_for_get",
      width: 150,
      editable: true,
    },
    {
      headerName: "Количество кредитов в реестрах",
      field: "credit_mount",
      width: 150,
      editable: true,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.contract;
      },
    },
    {
      headerName: "Количество поручителей",
      field: "count_debt_guarantor",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Имущество",
      field: "inventory",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Дополнительная информация",
      field: "additional_information",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Комментарий",
      field: "dsc",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Статус долга",
      field: "debt_status",
      width: 150,
      editable: true,
      type: "singleSelect",
    },
    {
      headerName: "ФИО Взыскателя",
      field: "fio_collector",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerName: "Ссылка на задачу",
      field: "task_link",
      width: 150,
      editable: true,
      type: "string",
    }, // rendering cells MUI
    /**
     * https://mui.com/x/react-data-grid/column-definition/#rendering-cells
     * */
  ];
  return columns;
}
