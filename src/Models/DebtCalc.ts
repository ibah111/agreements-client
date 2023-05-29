import { DebtCalc } from "@contact/models";
import { CreationAttributes } from "@sql-tools/sequelize";
import { IsValidMoment } from "../Hooks/Validation/IsValidMoment";

export class DebtCalcInstance implements CreationAttributes<DebtCalc> {
  parent_id: number;
  sum: number;
  @IsValidMoment()
  dt: moment.Moment;
  is_confirmed: number;
  @IsValidMoment()
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
  report_date?: moment.Moment | undefined;
  typ?: number | undefined;
  @IsValidMoment()
  confirm_dt?: moment.Moment | null | undefined;
  @IsValidMoment()
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
