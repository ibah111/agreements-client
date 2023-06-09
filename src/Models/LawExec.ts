import {
  Address,
  Debt,
  Dict,
  DocAttach,
  DocLink,
  GetDate,
  LawAct,
  LawCourt,
  LawExec,
  LawExecColumnLog,
  LawExecPersonLink,
  LawExecProtokol,
  Person,
  Portfolio,
  User,
} from "@contact/models";
import {
  BelongsToAttribute,
  HasManyAttribute,
  HasOneAttribute,
} from "@sql-tools/association-literal";
import {
  CreationAttributes,
  CreationOptional,
  NonAttribute,
} from "@sql-tools/sequelize";

export class LawExecInstance implements CreationAttributes<LawExec> {
  id: number;
  r_person_id: number;
  Person?: BelongsToAttribute<NonAttribute<Person>>;
  r_debt_id: number | null;
  Debt?: BelongsToAttribute<NonAttribute<Debt>>;
  r_portfolio_id: number | null;
  Portfolio?: BelongsToAttribute<NonAttribute<Portfolio>>;
  total_sum: number;
  r_user_id: number | null;
  User?: BelongsToAttribute<NonAttribute<User>>;
  court_doc_num: string | null;
  court_name: string | null;
  court_date: GetDate | null;
  fssp_name: string | null;
  fssp_doc_num: string | null;
  fssp_date: GetDate | null;
  start_date: GetDate | null;
  deposit_typ: number | null;
  officer_fio: string | null;
  officer_phone: string | null;
  officer_room: string | null;
  officer_fio2: string | null;
  officer_phone2: string | null;
  officer_room2: string | null;
  status: number | null;
  finish_date: GetDate | null;
  finish_reason: number | null;
  dsc: string | null;
  instruct: string | null;
  r_court_id: number | null;
  LawCourt?: BelongsToAttribute<NonAttribute<LawCourt>>;
  r_act_id: number | null;
  LawAct?: BelongsToAttribute<NonAttribute<LawAct>>;
  state: number;
  StateDict?: HasOneAttribute<NonAttribute<Dict>>;
  contract: string | null;
  currency: CreationOptional<number>;
  int_color: CreationOptional<number>;
  name: string | null;
  typ_name: number | null;
  due_sum: number | null;
  uncollectibility_act: string | null;
  load_dt: CreationOptional<GetDate>;
  receipt_act_dt: GetDate | null;
  executive_typ: number | null;
  ExecutiveTyp?: HasOneAttribute<NonAttribute<Dict>>;
  entry_force_dt: GetDate | null;
  reject_reason: number | null;
  reject_date: GetDate | null;
  complete_date: GetDate | null;
  receipt_arrest_dt: GetDate | null;
  receipt_recover_dt: GetDate | null;
  settlement_sum: number | null;
  settlement_date: GetDate | null;
  fssp_plan_date: GetDate | null;
  complete_plan_date: GetDate | null;
  restriction_to_leave_dt: GetDate | null;
  dict_value_1: number | null;
  r_address_id: number | null;
  Address?: BelongsToAttribute<NonAttribute<Address>>;
  ext_id$: string | null;
  DT_TO_ARCHIVE: GetDate | null;
  PAUSE_DATE: GetDate | null;
  PAUSE_REASON: number | null;
  REST_SUM: number | null;
  DELIVERY_TYP: number | null;
  QUORUM_ID: number | null;
  APPEAL_DATE: GetDate | null;
  LawExecProtokols?: HasManyAttribute<
    NonAttribute<LawExecProtokol[]>,
    "parent_id"
  >;
  LawExecPersonLink?: HasOneAttribute<
    HasOneAttribute<NonAttribute<LawExecPersonLink>>
  >;
  LawExecColumnLogs?: HasManyAttribute<
    NonAttribute<LawExecColumnLog[]>,
    "r_law_exec_id"
  >;
  DocAttachs?: HasManyAttribute<NonAttribute<DocAttach[]>, "r_id">;
  DocLinks?: HasManyAttribute<NonAttribute<DocLink[]>, "r_id">;
}
