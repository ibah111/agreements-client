import { DebtCalc } from "@contact/models";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export function getDebtPayments(id: number) {
  return of(`/Debt/Payments/${id}`).pipe(
    get<DebtCalc[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
