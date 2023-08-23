import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { transformError } from "../../../utils/processError";
import { baseRequest } from "../../../utils/baseRequest";
class RoleToUser {
  user_id: number;
  role_id: number;
}
export function addRoleToUser(data: RoleToUser) {
  return of(data).pipe(
    post<RoleToUser>(baseRequest, "/User/role"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
