import { of } from "rxjs";
import { baseRequest } from "../../../utils/baseRequest";
import {
  authRetry,
  post,
  transformAxios,
  transformFindAndCount,
} from "@tools/rxjs-pipes";
import { transformError } from "../../../utils/processError";
import { NonAttribute } from "@sql-tools/sequelize";
import {
  GridPaginationModel,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";

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

export interface UserPage {
  /**
   * model instance
   */
  rows: User[];
  count: number;
}
interface getAgreementInstanceParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}

export default function getAdminUserRole(params: getAgreementInstanceParams) {
  return of(params).pipe(
    post<UserPage>(baseRequest, "/AG/getAllUsers"),
    transformAxios(),
    transformError(),
    authRetry(),
    transformFindAndCount(User)
  );
}
