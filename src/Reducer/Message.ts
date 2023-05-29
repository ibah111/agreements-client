import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { OptionsObject } from "notistack";
interface IMessage {
  message: string;
  options?: OptionsObject;
}
const initialState: IMessage[] = [];
const MessageSlice = createSlice({
  initialState,
  name: "Message",
  reducers: {
    addMessage(state: IMessage[], action: PayloadAction<IMessage>) {
      state.push(action.payload);
    },
    resetMessage() {
      return initialState;
    },
  },
});
export const { addMessage, resetMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
