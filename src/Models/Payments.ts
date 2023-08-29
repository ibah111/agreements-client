import { User } from "@contact/models";

export class Payments {
  id?: number;
  id_agreement: number;
  pay_day: Date;
  sum_owe: number;
  status: boolean;
  user?: User;
  x: number;
}
