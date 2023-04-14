import { store } from "../Reducer";
import { baseRequest } from "../utils/baseRequest";
import { Observable } from "rxjs";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";
import { Debt } from "@contact/models";

export default function Search() {
  const request = store.getState().Search;
  return new Observable<Debt[]>((subscriber: any) => {
    baseRequest
      .post<Debt[]>("/search", request)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
