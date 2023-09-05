import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

export default function updatePayments(id_agreement: number) {
  return of("").pipe(
    post(baseRequest, `/Payments/updatePayments/${id_agreement}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
