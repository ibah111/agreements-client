import { post, transformAxios, authRetry } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function addDebtLink(id_agreement: number, id_debt: number) {
  return of({ id_agreement, id_debt }).pipe(
    post<boolean>(baseRequest, "/AgreementToDebt"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
