import { LawExec } from "@contact/models";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function getLinkedLawExec(agreementId: number) {
  return of({ agreementId }).pipe(
    post<LawExec[]>(baseRequest, "LawExecDebt/getExecs"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
