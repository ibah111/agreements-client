import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { Comments } from "../../Models/Comments";

export default function addComment(comment: string, id_agreement: number) {
  return of({ comment: comment, id_agreement: id_agreement }).pipe(
    post<Comments>(baseRequest, `/Comments`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
