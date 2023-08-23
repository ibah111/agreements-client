import { of } from "rxjs";
import { baseRequest } from "../../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { Role } from "./getAdminDetails";
import { transformError } from "../../../utils/processError";

export default function getAllRoles() {
  return of("/User/getAllRoles").pipe(
    get<Role[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
