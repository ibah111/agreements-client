import { Type } from "class-transformer";
import { IsUrl } from "class-validator";
import { User } from "./User.model";

export class App {
  index: number;
  id: number;
  @IsUrl()
  url_client: string;
  icon: string;
  title: string;
  preview: string;
  description: string;
  user: number;
  @Type(() => User)
  User: User;
  @IsUrl()
  url_server: string;
  @Type(() => User)
  Permits: User[];
}
