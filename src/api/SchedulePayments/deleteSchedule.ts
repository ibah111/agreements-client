import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function deleteScheduleLink(id_schedule: number) {
  return of("").pipe(
    remove(baseRequest, `/Payments/deleteScheduleLink/${id_schedule}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
