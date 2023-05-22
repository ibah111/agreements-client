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
    const promise = baseRequest.get<AgreementInstance[]>("/Agreements");
    promise.then(createNextDefault(sub)).catch(createError(sub));
    console.log(promise);
  }).pipe(createRetry());
}
