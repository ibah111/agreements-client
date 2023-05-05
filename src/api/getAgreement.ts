import { Observable } from "rxjs";
import type { Agreement } from "../Models/Agreement";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function getAgreements() {
  return new Observable<Agreement[]>((stream) => {
    const promise = baseRequest.get<Agreement[]>("/Agreements");
    promise.then(createNextDefault(stream)).catch(createError(stream));
  }).pipe(createRetry());
}
