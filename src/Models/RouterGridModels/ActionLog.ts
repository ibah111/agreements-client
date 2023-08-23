import { User } from "@contact/models";
/**
 * ref: ActiongLog in SQLServer
 */
export class ActionLogModel {
  id: number;
  row_id: number;
  actionType: number;
  field: string;
  user: number;
  User: User;
  old_value: any;
  new_value: any;
  createdAt: Date;
  updatedAt: Date;
}

export const obj_t = [
  {
    field: "conclusion_date",
    name: "Дата заключения",
  },
  {
    field: "purpose",
    name: "Назначение",
  },
  {
    field: "discount",
    name: "Дисконт",
  },
  {
    field: "sum",
    name: "Сумма с дисконтом",
  },
  {
    field: "full_req",
    name: "Полное требование",
  },
  {
    field: "month_pay_day",
    name: "День платежа",
  },
  {
    field: "task_link",
    name: "Ссылка на задачу",
  },
  {
    field: "collector_id",
    name: "Коллектор",
  },
  {
    field: "finish_date",
    name: "Дата завершения",
  },
  {
    field: "actions_for_get",
    name: "Действия для получения",
  },
  {
    field: "receipt_dt",
    name: "Дата получения листа",
  },
  {
    field: "agreement_type",
    name: "Тип соглашения",
  },
  {
    field: "statusAgreement",
    name: "Статус соглашения",
  },
];
