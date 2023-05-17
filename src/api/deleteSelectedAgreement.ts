import { Observable } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function deleteSelectedAgreements(list: number[]) {
  return new Observable((sub) => {
    baseRequest
      .delete(`/Agreements`, { data: { list } })
      .then(createNextDefault(sub))
      .catch(createError(sub));
  }).pipe(createRetry());
}
