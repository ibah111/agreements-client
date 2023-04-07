import { DebtCalc, LawAct, Person } from "@contact/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export class Results {
  LawAct: LawAct;
  DebtCalc: DebtCalc;
  Person: Person;
}
export class AgreementAddData {
  Reestr: string;
  DebtBankSum: number;
  BeforeSoglas: number;
}
const initialState = {} as {
  reload: boolean;
  loading: boolean;
  LawAct: LawAct;
  DebtCalc: DebtCalc;
  agreementData: AgreementAddData;
};

export const results = createSlice({
  name: "Results",
  initialState: initialState,
  reducers: {
    setLoadingResults: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setReloadResults: (state, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    ReloadResults: (state) => {
      state.reload = true;
    },
  },
});
export const { setLoadingResults, setReloadResults, ReloadResults } =
  results.actions;
export default results.reducer;
