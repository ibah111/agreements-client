import axios from "axios";
import { plainToInstance } from "class-transformer";
import { baseRequest } from "../../../../utils/baseRequest";
import { LawAct } from "@contact/models";

export class Agreement {
  r_law_act_id: number;
  LawAct: LawAct;
  last_check_date: Date;
  conclusion_date: Date;
  purpose: number;
  court_sum: number;
  debt_sum: number;
  recalculation_sum: number | null;
  discount_sum: number | null;
  month_pay_day: number;
  reg_doc: boolean;
  finish_doc: boolean;
  actions_for_get: string | null;
  comment: string;
  task_link: string;
}
export default async function Rows(data: Agreement) {
  try {
    const res = await baseRequest.post<Agreement>("/Agreements/getAll", {
      ...data,
    });
    return plainToInstance(Agreement, res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Ошибка");
      console.log(error.response?.data);
    }
    throw error;
  }
}
