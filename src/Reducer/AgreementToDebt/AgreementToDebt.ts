import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import AgreementDebtsLink from "../../Models/AgreementDebtLink";

export type AgreementToDebtData = AgreementDebtsLink;

const initialState = {} as AgreementToDebtData;

const AgreementToDebtSlice = createSlice({
  initialState,
  name: "AgreementToDebt",
  reducers: {
    setAgreementToDebt(_, action: PayloadAction<AgreementToDebtData>) {
      return action.payload;
    },
    setAgreementToDebtProperty: <T extends keyof AgreementToDebtData>(
      state: Draft<AgreementToDebtData>,
      action: PayloadAction<[T, AgreementToDebtData[T]]>
    ) => {
      state[action.payload[0]] = action.payload[1];
    },
    resetAgreementToDebt() {
      return initialState;
    },
  },
});
export const {
  setAgreementToDebt,
  setAgreementToDebtProperty,
  resetAgreementToDebt,
} = AgreementToDebtSlice.actions;
export default AgreementToDebtSlice.reducer;
