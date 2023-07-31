import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { PersonProperty } from "@contact/models";
import { transformError } from "../../utils/processError";

export default function getPersonProperty(id_agreement: number) {
  return of(`PersonProperty/getPropsInAgreement/${id_agreement}`).pipe(
    get<PersonProperty[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
