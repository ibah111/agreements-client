import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { Payments } from "../../Models/Payments";
import { transformError } from "../../utils/processError";

export default function getSchedule(id_agreement: number) {
  return of(`/Payments/${id_agreement}`).pipe(
    get<Payments[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
