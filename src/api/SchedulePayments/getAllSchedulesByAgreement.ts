import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { ScheduleLinkModel } from "../../pages/Main/Table/ScheduleDialog/ScheduleLink/ScheduleLinkModel";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function getAllSchedulesByAgreement(id_agreement: number) {
  return of(`Payments/getAllSchedulesByAgreement/${id_agreement}`).pipe(
    get<ScheduleLinkModel[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
