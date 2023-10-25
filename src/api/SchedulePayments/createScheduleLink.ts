import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
interface InputData {
  id_agreement: number;
  schedule_type: number;
  id_debt?: number;
  contract?: string;
  court_doc_num?: string;
}
export default function createScheduleLinks(data: InputData) {
  return of(data).pipe(
    post<InputData>(baseRequest, `/Payments/createScheduleLink`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
