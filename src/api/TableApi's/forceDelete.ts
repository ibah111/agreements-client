import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import { AgreementInstance } from "../../Reducer/Agreement/AgreementInstance";

export default function forceDeleted(id_agreement: number) {
  return of("").pipe(
    remove<AgreementInstance>(baseRequest, `/AG/forceDelete/${id_agreement}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
