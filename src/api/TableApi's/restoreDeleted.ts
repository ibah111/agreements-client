import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, patch, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import { AgreementInstance } from "../../Reducer/Agreement/AgreementInstance";

export default function restoreDeleted(id: number) {
  return of("").pipe(
    patch<AgreementInstance>(baseRequest, `/AG/restoreDeleted/${id}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
