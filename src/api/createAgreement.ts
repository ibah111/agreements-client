import {
  authRetry,
  post,
  transformAxios,
  validateData,
} from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function createAgreement(data: AgreementInstance) {
  return of(data).pipe(
    validateData(AgreementInstance),
    post(baseRequest, "/Agreements"),
    transformAxios(),
    transformError("Agreements"),
    authRetry()
  );
}
