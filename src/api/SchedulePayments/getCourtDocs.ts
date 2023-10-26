import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { LawAct } from "@contact/models";

export default function getCourtDocs(id_debt: number) {
  return of(`/Payments/getCourtDocs/${id_debt}`).pipe(
    get<LawAct[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
