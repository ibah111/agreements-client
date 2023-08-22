import { of } from "rxjs";
import { baseRequest } from "../../../utils/baseRequest";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { User } from "./getAdminDetails";
import { transformError } from "../../../utils/processError";

export default function addUser(data: User) {
  return of(data).pipe(
    post<User>(baseRequest, "/User"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
