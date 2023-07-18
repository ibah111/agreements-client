import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { Comments } from "../../Models/Comments";
interface addCommentArgs {
  comment: string;
  id_agreement: number;
}
export default function addComment(args: addCommentArgs) {
  return of(args).pipe(
    post<Comments>(baseRequest, `/Comments`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
