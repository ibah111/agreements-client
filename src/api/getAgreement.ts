import { LawAct } from "@contact/models";
import { plainToInstance, Type } from "class-transformer";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export class Agreement {
  r_law_act_id: number;
  @Type(() => Date)
  last_check_date: Date;
  @Type(() => Date)
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
  LawAct: LawAct;
}
export default async function getAgreements() {
  try {
    const res = await baseRequest.get<Agreement[]>(`/Agreements`);
    return plainToInstance(Agreement, res.data);
  } catch (error) {
    processError(error);
    throw error;
  }
}
