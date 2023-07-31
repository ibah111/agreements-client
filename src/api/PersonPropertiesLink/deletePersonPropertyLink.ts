import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { transformError } from "../../utils/processError";
import { baseRequest } from "../../utils/baseRequest";

export default function deletePersonPropertyLink(
  id_agreement: number,
  id_person_property: number
) {
  return of({ id_agreement, id_person_property }).pipe(
    remove<boolean>(baseRequest, `/PersonProperty`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
