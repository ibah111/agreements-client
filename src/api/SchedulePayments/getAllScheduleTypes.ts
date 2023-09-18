import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { IdTitle } from "../../Models/IdTitle";

export default function getAllScheduleTypes() {
  return of("/Payments/getAllScheduleTypes").pipe(
    get<IdTitle[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
