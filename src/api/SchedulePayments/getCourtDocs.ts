import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { LawExec } from "@contact/models";

export default function getCourtDocs(id_debt: number) {
  return of().pipe(
    get<LawExec[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
