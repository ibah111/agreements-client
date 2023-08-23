import { of } from "rxjs";
import { baseRequest } from "../../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../../utils/processError";
import { NonAttribute } from "@sql-tools/sequelize";

export class User {
  id?: number;
  login: string;
  Roles?: NonAttribute<Array<Role & { User_Role?: User_Role }>>;
}

export class Role {
  id?: number;
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
  return of("/AG/getAllUsers").pipe(
    get<User[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
