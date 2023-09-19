import { User } from "@contact/models";
import { IsNotEmpty } from "class-validator";
import moment from "moment";
import { IsValidMoment } from "../Hooks/Validation/IsValidMoment";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";

export class Calcs {
  id_payment: number;
  id_debt_calc: number;
}
export class Payments {
  id?: number;
  id_schedule: number;
  @IsValidMoment()
  @IsNotEmpty()
  @DateType(false)
  @TransformDate(false)
  pay_day: moment.Moment;
  sum_owe: number;
  status: boolean;
  user?: User;
  x: number;
  Calcs?: Calcs[];
}
