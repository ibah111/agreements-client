import { Debt, Portfolio } from "@contact/models";

export default class AgreementDebtsLink {
  Portfolio: Portfolio;
  Debt: Debt;
  id_debt: number;
  id_agreement: number;
}
