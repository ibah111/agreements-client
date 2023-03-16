import axios from "axios";
import { plainToInstance } from "class-transformer";

export class Agreement {
  r_law_act_id: number;
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
export default async function getAgreements() {
  try {
    const res = await axios.get<Agreement[]>(
      `http://localhost:3001/Agreements/GetAgreementWith`
    );
    return plainToInstance(Agreement, res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Такого пользователя не существует");
      console.log(error.response?.data);
    }
    throw error;
  }
}
