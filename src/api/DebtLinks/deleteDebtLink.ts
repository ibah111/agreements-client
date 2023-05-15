import { Observable } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import {
  createNextDefault,
  createError,
  createRetry,
} from "../../utils/processError";

export default function deleteDebtLink(id_agreement: number, id_debt: number) {
  return new Observable<void>((subscriber) => {
    baseRequest
      .delete<void>("/AgreementToDebt", {
        data: { id_agreement, id_debt },
      })
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
