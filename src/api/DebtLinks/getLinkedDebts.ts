import { of } from "rxjs";
import { Debt } from "@contact/models";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

export default function getLinkedDebts(id_agreement: number) {
  return of(`/AgreementToDebt/${id_agreement}`).pipe(
    get<Debt[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
