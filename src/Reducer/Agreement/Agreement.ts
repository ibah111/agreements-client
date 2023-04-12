import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreationAttributes } from "@sql-tools/sequelize";
import { Agreement } from "../../Models/Agreement";
import { Debt } from "@contact/models";

export type AgreementData = CreationAttributes<Agreement>;

const initialState = {} as AgreementData;

const AgreementSlice = createSlice({
  initialState,
  name: "Agreement",
  reducers: {
    setAgreement(_, action: PayloadAction<AgreementData>) {
      return action.payload;
    },
    setAgreementProperty: <T extends keyof AgreementData>(
      state: Draft<AgreementData>,
      action: PayloadAction<[T, AgreementData[T]]>
    ) => {
      state[action.payload[0]] = action.payload[1];
    },
    addDebtDataInAgr(state, action: PayloadAction<Debt>) {
      if (action.payload.Person) state.personId = action.payload.Person.id;
    },
    resetAgreement() {
      return initialState;
    },
  },
});
export const {
  resetAgreement,
  setAgreement,
  setAgreementProperty,
  addDebtDataInAgr,
} = AgreementSlice.actions;
export default AgreementSlice.reducer;
