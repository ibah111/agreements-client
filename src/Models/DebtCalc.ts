import { DebtCalc, Dict } from "@contact/models";
import { CreationAttributes, NonAttribute } from "@sql-tools/sequelize";
import { IsValidMoment } from "../Hooks/Validation/IsValidMoment";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";
import { HasOneAttribute } from "@sql-tools/association-literal";

export class DebtCalcInstance implements CreationAttributes<DebtCalc> {
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
  int_sum: number;
  id?: number;
  is_cancel?: number;
  r_promise_id?: number;
  dsc?: string;
  r_currency_id?: number;
  commission?: number;
  id$?: number;
  r_user_id?: number;
  req_change?: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  report_date?: moment.Moment;
  typ?: number;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  confirm_dt?: moment.Moment;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  cancel_dt?: moment.Moment;
  invoice_flag?: number;
  r_req_user_id?: number;
  r_bank_requisites_id?: number;
  ext_id?: number;
  payer_name?: string;
  contract_number?: string;
  ticket_number?: string;
  purpose?: number;
  PurposeDict?: HasOneAttribute<NonAttribute<Dict>>;
  NUMBER_VALUE_1?: number;
  NUMBER_VALUE_2?: number;
  NUMBER_VALUE_3?: number;
  NUMBER_VALUE_4?: number;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
  version?: any;
}
