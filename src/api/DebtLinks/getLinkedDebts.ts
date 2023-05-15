import { Observable } from "rxjs";
import { Debt } from "@contact/models";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../../utils/processError";
import { baseRequest } from "../../utils/baseRequest";

export default function getLinkedDebts(id_agreement: number) {
  return new Observable<Debt[]>((subscriber) => {
    baseRequest
      .get<Debt[]>(`/AgreementToDebt/${id_agreement}`)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
