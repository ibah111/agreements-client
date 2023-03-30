import { DebtCalc, LawAct } from "@contact/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LawExecPlain } from "../api/searchContact";
export class Results {}
const initialState: {
  reload: boolean;
  loading: boolean;
  data: LawExecPlain[];
  LawAct: LawAct;
  DebtCalc: DebtCalc;
} = {
  loading: false,
  data: [],
  reload: false,
  LawAct: new LawAct(),
  DebtCalc: new DebtCalc(),
};
export const results = createSlice({
  name: "Results",
  initialState: initialState,
  reducers: {
    setResults: (state, action: PayloadAction<LawExecPlain[]>) => {
      state.data = action.payload;
    },
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
export const {
  setResults,
  setLoadingResults,
  setReloadResults,
  ReloadResults,
} = results.actions;
export default results.reducer;
