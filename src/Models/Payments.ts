import { User } from "@contact/models";

export class Calcs {
  id_payment: number;
  id_debt_calc: number;
}
export class Payments {
  id?: number;
  id_agreement: number;
  pay_day: Date;
  sum_owe: number;
  sum_payed?: number;
  status: boolean;
  user?: User;
  x: number;
  Calcs?: Calcs[];
}
