import { Observable } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function deleteAgreement(id: number) {
  return new Observable<boolean>((sub) => {
    baseRequest
      .delete<boolean>(`/Agreements/${id}`)
      .then(createNextDefault(sub))
      .catch(createError(sub));
  }).pipe(createRetry());
}
