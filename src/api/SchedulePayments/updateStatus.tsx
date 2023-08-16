import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

interface updateInput {
  id_agreement: number;
  id_payments: number;
}
export default function updateStatus(props: updateInput) {
  return of(props).pipe(
    post(baseRequest, "/Payments/updateStatus"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
