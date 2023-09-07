import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, patch, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

interface EditInput {
  pay_day: moment.Moment;
  sum_owe: number;
}

export default function editPayment(id_payment: number, data: EditInput) {
  return of(data).pipe(
    patch(baseRequest, `/Payments/updateCalc/${id_payment}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
