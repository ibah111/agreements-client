import { contactStore } from "../Reducer";
import { baseRequest } from "../utils/baseRequest";
import { Observable } from "rxjs";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";
export class PersonAddress {
  full_adr: string;
}
export class LawExecPlain {
  "id": number;
  "court_doc_num": string;
  "executive_typ": number;
  "fssp_doc_num": string;
  "court_date": Date;
  "entry_force_dt": Date;
  "StateDict.name": string;
  "LawExecPersonLink.DebtGuarantor.fio"?: string;
  "LawAct.id": number;
  "LawAct.typ": number;
  "LawAct.StatusDict.name": string;
  "LawAct.ActStatusDict.name": string;
  "Portfolio.name": string;
  "ExecutiveTyp.name": string;
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
  "Person.Addresses": PersonAddress[];
}

export default function Search() {
  const request = contactStore.getState().Search;
  return new Observable<LawExecPlain[]>((subscriber: any) => {
    baseRequest
      .post<LawExecPlain[]>("/search", request)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
