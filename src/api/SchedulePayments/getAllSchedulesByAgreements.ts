import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function getAllSchedulesByAgreements(id_agreement: number) {
  return of(`getAllSchedulesByAgreements/${id_agreement}`).pipe(
    get(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
