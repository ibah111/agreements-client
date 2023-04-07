import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreationAttributes } from "@sql-tools/sequelize";
import { Agreement } from "../../Models/Agreement";

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
    resetAgreement() {
      return initialState;
    },
  },
});
export const { resetAgreement, setAgreement, setAgreementProperty } =
  AgreementSlice.actions;
export default AgreementSlice.reducer;
