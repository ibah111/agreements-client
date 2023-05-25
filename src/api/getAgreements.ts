import { Observable } from "rxjs";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function getAgreements() {
  return new Observable<AgreementInstance[]>((sub) => {
    baseRequest
      .get<AgreementInstance[]>("/Agreements")
      .then(createNextDefault(sub))
      .catch(createError(sub));
  }).pipe(createRetry());
}
