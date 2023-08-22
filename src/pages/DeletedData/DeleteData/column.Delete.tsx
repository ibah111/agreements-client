import { GridColDef } from "@mui/x-data-grid-premium";

import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";
import RestoreButton from "./RestoreButton";
import getDateMoment from "../../../utils/getDateMoment";

export default function columnDeleteData() {
  const columns: GridColDef<AgreementInstance>[] = [
    {
      field: "id",
      headerAlign: "center",
      headerName: "ID",
      align: "center",
      width: 150,
      type: "number",
    },
    {
      field: "deletedAt",
      headerAlign: "center",
      headerName: "Когда удален",
      align: "center",
      width: 150,
      type: "Date",
      valueFormatter(params) {
        return getDateMoment(params.value);
      },
    },
    {
      field: "conclusion_date",
      headerName: "Дата заключения",
      align: "center",
      width: 150,
      type: "Date",
      valueFormatter(params) {
        return getDateMoment(params.value);
      },
    },
    {
      field: "finish_date",
      headerName: "Дата завершения",
      headerAlign: "center",
      align: "center",
      width: 150,
      type: "Date",
      valueFormatter(params) {
        if (params.value === null) return "";
        return getDateMoment(params.value);
      },
    },
    {
      field: "purpose",
      headerName: "Назначение",
      headerAlign: "center",
      align: "center",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "agreement_type",
      headerName: "Тип соглашения",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "sum",
      headerName: "Сумма с дисконтом",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "discount",
      headerName: "Дисконт",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "full_req",
      headerName: "Полная сумма требования",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "month_pay_day",
      headerName: "День платежа",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "reg_doc",
      headerName: "ИД",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "registrator",
      headerName: "Регистратор",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "archive",
      headerName: "Архив",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "collector_id",
      headerName: "Коллектор",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "task_link",
      headerName: "Ссылка на задачу",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "person_id",
      headerName: "ID персоны",
    },
    {
      headerAlign: "center",
      align: "center",
      field: "actions_for_get",
      headerName: "Действия для получения листа",
    },
    {
      field: "receipt_dt",
      headerName: "Дата получения листа",
    },
    {
      field: "comment",
      headerName: "Комментарий",
    },
    {
      field: "payable_status",
      headerName: "Платёжный статус",
      type: "boolean",
    },
    {
      field: "statusAgreement",
      headerName: "Статус соглашения",
    },
    {
      field: "actions",
      headerName: "Дейтвия",
      type: "actions",
      getActions: (params) => [<RestoreButton id_agreement={params.row.id} />],
    },
  ];
  return columns;
}
