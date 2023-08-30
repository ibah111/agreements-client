import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import { Payments } from "../../Models/Payments";

export default function getPayment(id_payment: number) {
  return of(`/Payments/Payment/${id_payment}`).pipe(
    get<Payments>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
