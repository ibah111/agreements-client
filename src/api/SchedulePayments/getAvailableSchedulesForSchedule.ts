import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { Debt } from "@contact/models";
import { transformError } from "../../utils/processError";

export default function getAvailableSchedulesForSchedule(id_agreement: number) {
  return of(`Payments/getAvailableDebtForSchedule/${id_agreement}`).pipe(
    get<Debt[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
