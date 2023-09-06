import { User } from "../Schemas/User.model";

export class Comments {
  id: number;
  id_agreement: number;
  comment: string | null;
  user: number;
  User: User;
}
