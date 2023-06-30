import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreationAttributes } from "@sql-tools/sequelize";
import { Agreement } from "../../Models/Agreement";
import { AgreementInstance } from "./AgreementInstance";
import DebtInstance from "../../Models/Debt";

export type AgreementData = CreationAttributes<Agreement>;

const initialState = {} as AgreementInstance;

const AgreementSlice = createSlice({
  initialState,
  name: "Agreement",
  reducers: {
    setAgreement(_, action: PayloadAction<AgreementInstance>) {
      return action.payload;
    },
    setAgreementProperty: <T extends keyof AgreementInstance>(
      state: Draft<AgreementInstance>,
      action: PayloadAction<[T, AgreementInstance[T]]>
    ) => {
      state[action.payload[0]] = action.payload[1];
    },
    addDebtDataInAgr(state, action: PayloadAction<DebtInstance>) {
      if (action.payload.Person) state.person_id = action.payload.Person.id;
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
