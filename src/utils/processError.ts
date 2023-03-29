import axios, { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import callMessage from "./callMessage";
import { Observable, retry, Subscriber } from "rxjs";

export default function processError(e: unknown) {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      callMessage(e.response.data?.message || "Неизвестная ошибка", {
        variant: "error",
      });
      return enqueueSnackbar(`${e.message} ${e.cause}, ${e.code}`, {
        variant: "error",
      });
    }
  }
}
export function createError<T>(subscriber: Subscriber<T>) {
  return async (e: unknown) => subscriber.error(await processError(e));
}
export function createNextDefault<T>(subscriber: Subscriber<T>) {
  return (res: AxiosResponse<T>) => {
    subscriber.next(res.data);
    subscriber.complete();
  };
}
export function createRetry<T>() {
  return retry<T>({
    delay: (err) =>
      new Observable((subscriber) => {
        if (err === "retry") subscriber.next();
        subscriber.complete();
      }),
  });
}
