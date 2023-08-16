import { User } from "../Schemas/User.model";

export class Payments {
  id: number;
  id_agreement: number;
  pay_day: Date;
  sum_owe: number;
  status: boolean;
  user: User;
}
