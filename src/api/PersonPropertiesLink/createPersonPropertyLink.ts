import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function createPersonPropertyLink(
  id_agreement: number,
  id_person_property: number
) {
  return of({ id_agreement, id_person_property }).pipe(
    post<boolean>(baseRequest, `/PersonProperty`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
