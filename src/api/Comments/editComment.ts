import { authRetry, patch, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

interface EditData {
  newCommentTxt: string;
  id_agreement: number;
}

export default function editComment(id_comment: number, data: EditData) {
  return of(data).pipe(
    patch(baseRequest, `/Comments/patchComment/${id_comment}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
