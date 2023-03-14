import axios from "axios";
import { Agreement } from "../Agreement";

export default async function addAgreement(data: Agreement) {
  try {
    const create = await axios.post<Agreement>(
      "http://localhost:3001/Agreements/AgreementsController_createAgreement",
      {
        ...data,
        // АБОБА
        // r_law_act_id: data.r_law_act_id,
        // last_check_date: data.last_check_date,
        // conclusion_date: data.conclusion_date,
        // purpose: data.purpose, // autocomplete
        // court_sum: data.court_sum,
        // debt_sum: data.debt_sum,
        // recalculation_sum: data.recalculation_sum,
        // discount_sum: data.discount_sum,
        // month_pay_day: data.month_pay_day,
        // reg_doc: data.reg_doc,
        // finish_doc: data.finish_doc,
        // actions_for_get: data.actions_for_get,
        // comment: data.comment,
        // task_link: data.task_link,
      }
    );
    console.log(create);
    return create.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
}
