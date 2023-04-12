import { Debt } from "@contact/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = null as Debt | null;
const DebtSlice = createSlice({
  name: "Debt",
  initialState,
  reducers: {
    setDebt: (state, action: PayloadAction<Debt | null>) => action.payload,
  },
});
export const { setDebt } = DebtSlice.actions;
export default DebtSlice.reducer;
