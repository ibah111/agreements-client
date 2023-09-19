import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

export default function deletePayment(id_payment: number) {
  return of("").pipe(
    remove<boolean>(baseRequest, `/Payments/deletePayment/${id_payment}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
