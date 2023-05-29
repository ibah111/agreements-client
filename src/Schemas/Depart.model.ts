import { User } from "./User.model";
export class Depart {
  id: number;
  bitrix_id: number;
  name: string;
  title: string;
  parent_id: number;
  Users: User[];
}
