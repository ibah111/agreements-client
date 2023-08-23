import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../../utils/baseRequest";
import { transformError } from "../../../utils/processError";

export default function deleteUser(id: number) {
  return of({ id }).pipe(
    remove<boolean>(baseRequest, "/User"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
