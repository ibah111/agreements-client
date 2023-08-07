import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import AgreementDebtsLink from "../../Models/AgreementDebtLink";

export default function getLinkedDebts(id_agreement: number) {
  return of(`/AgreementToDebt/getLinkedDebts/${id_agreement}`).pipe(
    get<AgreementDebtsLink[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
