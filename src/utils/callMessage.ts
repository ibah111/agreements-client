import { OptionsObject } from "notistack";
import { store } from "../Reducer";
import { addMessage } from "../Reducer/Message";
export default function callMessage(message: string, options?: OptionsObject) {
  store.dispatch(addMessage({ message, options }));
}
