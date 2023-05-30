import { Dict } from "@contact/models";
import { Observable } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function getDict(value: number) {
  return new Observable<Dict[]>((subscriber) => {
    baseRequest
      .post<Dict[]>("/dict", {
        id: value,
      })
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
