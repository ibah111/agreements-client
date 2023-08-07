import { IsValidMoment } from "../Hooks/Validation/IsValidMoment";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";
import moment from "moment-timezone";

export default class AgreementDebtsLink {
  id_debt: number;
  id_agreement: number;
  contract: string;
  error: number;
  first_payment: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  first_payment_date: moment.Moment;
  last_payment: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  last_payment_date: moment.Moment;
  payable_status: boolean;
  portfolio: number;
  sum_payments: number;
}
