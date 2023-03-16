import axios from "axios";
import callMessage from "./callMessage";

export default function processError(e: unknown) {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      callMessage(e.response.data?.message || "Неизвестная ошибка", {
        variant: "error",
      });
    }
  }
}
