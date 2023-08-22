import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import { AgreementInstance } from "../../Reducer/Agreement/AgreementInstance";

export default function getDeleted() {
  return of("/AG/getDeleted").pipe(
    get<AgreementInstance[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
