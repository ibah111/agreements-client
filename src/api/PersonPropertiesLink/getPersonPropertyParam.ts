import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { PersonProperty } from "@contact/models";

export default function getPersonPropertyParam(id_person: number) {
  return of(`/PersonProperty/getPersonPropertyParam/${id_person}`).pipe(
    get<PersonProperty[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
