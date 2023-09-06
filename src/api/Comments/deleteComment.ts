import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

export default function deleteFunction(id_comment: number) {
  return of("").pipe(
    remove(baseRequest, `/Comments/deleteComments/${id_comment}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
