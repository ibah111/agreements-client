import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";

export default function findAllByPersonId(person_id: number) {
  return of(`/Agreements/findAllByPersonId/${person_id}`).pipe(
    get<AgreementInstance[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
