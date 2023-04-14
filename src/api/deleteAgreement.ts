import { Observable } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function deleteAgreement(id: number) {
  return new Observable<boolean>((subscriber: any) => {
    baseRequest
      .delete<boolean>(`/Agreements/${id}`)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
