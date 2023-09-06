import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { Comments } from "../../Models/Comments";
export default function getComments(id_agreement: number) {
  return of(`/Comments/${id_agreement}`).pipe(
    get<Comments[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
