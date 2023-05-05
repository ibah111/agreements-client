import { Observable } from "rxjs";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../../utils/processError";
import { baseRequest } from "../../utils/baseRequest";

export default function addDebtLink(id_agreement: number, id_debt: number) {
  return new Observable<void>((subscriber) => {
    baseRequest
      .post<void>("/AgreementToDebtConnection", {
        id_agreement,
        id_debt,
      })
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
