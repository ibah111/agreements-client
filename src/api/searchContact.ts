import { store } from "../Reducer";
import { baseRequest } from "../utils/baseRequest";
import { Observable } from "rxjs";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";
import { Debt } from "@contact/models";
export class PersonAddress {
  full_adr: string;
}
export class LawExecPlain {
  "id": number;
  "Debt.id": number;
  "Debt.contract": string;
  "Debt.debt_sum": number;
  "Debt.status": number;
  "Debt.StatusDict.name": string;
  "Person.fio": string;
  "Person.id": number;
  "Person.f": string;
  "Person.i": string;
  "Person.o": string;
}

export default function Search() {
  const request = store.getState().Search;
  console.log(request);
  return new Observable<Debt[]>((subscriber: any) => {
    baseRequest
      .post<Debt[]>("/search", request)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
