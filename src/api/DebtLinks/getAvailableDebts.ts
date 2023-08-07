import { of } from "rxjs";
import { Debt } from "@contact/models";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

export default function getAvailableDebts(id_agreement: number) {
  return of({ id_agreement }).pipe(
    post<Debt[]>(baseRequest, "/AgreementToDebt/getAvailableDebts"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
