import { DebtCalc, Dict } from "@contact/models";
import { CreationAttributes, NonAttribute } from "@sql-tools/sequelize";
import { IsValidMoment } from "../Hooks/Validation/IsValidMoment";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";
import { HasOneAttribute } from "@sql-tools/association-literal";

export class DebtCalcInstance implements Partial<CreationAttributes<DebtCalc>> {
  parent_id: number;
  sum: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  dt: moment.Moment;
  is_confirmed: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  calc_date: moment.Moment;
  id?: number;
  is_cancel?: number;
  r_promise_id?: number;
  dsc?: string;
  typ?: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  confirm_dt?: moment.Moment;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  cancel_dt?: moment.Moment;
  purpose?: number;
  PurposeDict?: HasOneAttribute<NonAttribute<Dict>>;
}
