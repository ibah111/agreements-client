import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { IdTitle } from "../../Models/IdTitle";

export default function getAllScheduleTypes(id_agreement: number) {
  return of(`/Payments/getAllScheduleTypes/${id_agreement}`).pipe(
    get<IdTitle[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
