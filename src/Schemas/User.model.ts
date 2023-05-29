import { App } from "./App.model";
import { Depart } from "./Depart.model";
import { Role } from "./Role.model";
export class User {
  id: number;
  bitrix_id: number;
  login: string;
  f: string;
  i: string;
  o: string;
  depart: number;
  Depart: Depart;
  Roles: Role[];
  Permits: App[];
  Apps: App[];
}
