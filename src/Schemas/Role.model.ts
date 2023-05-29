import { Type } from "class-transformer";
import { User } from "./User.model";

export class Role {
  id: number;
  name: string;
  title: string;
  @Type(() => User)
  Users: User[];
}
