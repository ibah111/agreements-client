import { authRetry, get, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { PersonProperty } from "@contact/models";
import { transformError } from "../../utils/processError";

export default function createPersonPropertyLink() {
  return of(`PersonProperty/`).pipe(
    post<PersonProperty[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
