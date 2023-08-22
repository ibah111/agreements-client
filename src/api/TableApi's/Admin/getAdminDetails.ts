import { of } from "rxjs";
import { baseRequest } from "../../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../../utils/processError";

export class User {
  id: number;
  login: string;
}

export class Role {
  id: number;
  name: string;
  title: string;
}

export class User_Role {
  id: number;
  user_id: number;
  User?: User;
  role_id: number;
  Role?: Role;
}

export default function getAdminUserRole() {
  return of("/AG/getAllUserRole").pipe(
    get<User_Role[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
