import { LawAct } from "@contact/models";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Type } from "class-transformer";

export class Agreement {
  id: number;
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
  dsc: string;
  task_link: string;
  LawAct: LawAct;
}

const initialState: Agreement = {} as Agreement;

const AgreementSlice = createSlice({
  initialState,
  name: "Agreement",
  reducers: {
    setAgreement(_, action: PayloadAction<Agreement>) {
      return action.payload;
    },
    setAgreementProperty: <T extends keyof Agreement>(
      state: Draft<Agreement>,
      action: PayloadAction<[T, Agreement[T]]>
    ) => {
      state[action.payload[0]] = action.payload[1];
    },
    resetAgreement() {
      return initialState;
    },
  },
});
export const { resetAgreement, setAgreement, setAgreementProperty } =
  AgreementSlice.actions;
export default AgreementSlice.reducer;
