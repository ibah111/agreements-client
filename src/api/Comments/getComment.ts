import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { Comments } from "../../Models/Comments";

export default function getComment(id_comment: number) {
  return of(`/Comments/getComment/${id_comment}`).pipe(
    get<Comments>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
