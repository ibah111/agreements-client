import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import {
  authRetry,
  get,
  transformAxios,
  transformInstance,
} from "@tools/rxjs-pipes";
import { Payments } from "../../Models/Payments";
import { transformError } from "../../utils/processError";

export default function getSchedule(id_schedule: number) {
  return of(`/Payments/getSchedule/${id_schedule}`).pipe(
    get<Payments[]>(baseRequest),
    transformAxios(),
    transformInstance(Payments),
    transformError(),
    authRetry()
  );
}
