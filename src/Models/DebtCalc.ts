import { DebtCalc } from "@contact/models";
import { CreationAttributes } from "@sql-tools/sequelize";
import { IsValidMoment } from "../Hooks/Validation/IsValidMoment";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";

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
  id?: number | undefined;
  is_cancel?: number | undefined;
  r_promise_id?: number | null | undefined;
  dsc?: string | null | undefined;
  r_currency_id?: number | undefined;
  commission?: number | null | undefined;
  id$?: number | null | undefined;
  r_user_id?: number | null | undefined;
  req_change?: number | null | undefined;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  report_date?: moment.Moment | undefined;
  typ?: number | undefined;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  confirm_dt?: moment.Moment | null | undefined;
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  cancel_dt?: moment.Moment | null | undefined;
  invoice_flag?: number | undefined;
  r_req_user_id?: number | null | undefined;
  r_bank_requisites_id?: number | null | undefined;
  ext_id?: number | null | undefined;
  payer_name?: string | null | undefined;
  contract_number?: string | null | undefined;
  ticket_number?: string | null | undefined;
  purpose?: number | null | undefined;
  NUMBER_VALUE_1?: number | null | undefined;
  NUMBER_VALUE_2?: number | null | undefined;
  NUMBER_VALUE_3?: number | null | undefined;
  NUMBER_VALUE_4?: number | null | undefined;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
  version?: any;
}
