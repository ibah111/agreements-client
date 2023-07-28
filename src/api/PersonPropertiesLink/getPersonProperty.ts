import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { PersonProperty } from "@contact/models";
import { transformError } from "../../utils/processError";

export default function getPersonProperty(person_id: number) {
  return of(`PersonProperty/${person_id}`).pipe(
    get<PersonProperty[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
