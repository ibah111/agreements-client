import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
interface SearchState {
  fio: string;
  contract: string;
}

const initialState: SearchState = { fio: "", contract: "" };

export const search = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.fio = action.payload;
    },
    setContract: (state, action: PayloadAction<string>) => {
      state.contract = action.payload;
    },
    setSearchValue: function <T extends keyof SearchState>(
      state: Draft<SearchState>,
      action: PayloadAction<[T, SearchState[T]]>
    ) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});
export const { setName, setContract, setSearchValue } = search.actions;
export default search.reducer;
