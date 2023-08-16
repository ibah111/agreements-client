import { of } from "rxjs";
import { Payments } from "../../Models/Payments";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function addPayment(data: Payments) {
  return of(data).pipe(
    post(baseRequest, "/Payments"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
