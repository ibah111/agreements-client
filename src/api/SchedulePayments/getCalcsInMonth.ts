import { transformAxios, authRetry, get } from "@tools/rxjs-pipes";

import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { DebtCalcInstance } from "../../Models/DebtCalc";

export default function getCalcsInMonth(id_payment: number) {
  return of(`/Payments/getCalcsInMonth/${id_payment}`).pipe(
    get<DebtCalcInstance[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
