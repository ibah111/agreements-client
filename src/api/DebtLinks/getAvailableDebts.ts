import { Observable } from "rxjs";
import { Debt } from "@contact/models";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../../utils/processError";
import { baseRequest } from "../../utils/baseRequest";

export default function getAvailableDebts(id_agreement: number) {
  return new Observable<Debt[]>((subscriber) => {
    baseRequest
      .post<Debt[]>("/AgreementToDebt/getAllowedDebts", {
        id_agreement,
      })
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
