import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { transformError } from "../../utils/processError";

export default function deletePersonPropertyLink(
  id_agreement: number,
  id_person_property: number
) {
  return of(`PersonProperty/`).pipe(
    remove(),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
