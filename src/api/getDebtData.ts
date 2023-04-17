import { Debt, DebtCalc } from "@contact/models";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export async function getDebtPerson(id: number) {
  try {
    const res = await baseRequest.get<Debt[]>(`/Debt/${id}`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
export async function getPersonDebts(id: number) {
  // const request = store.getState().Agreement.personId;
  try {
    const res = await baseRequest.get<Debt[]>(`/Debt/Person/${id}`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
export async function getDebtPayments(id: number) {
  try {
    const res = await baseRequest.get<DebtCalc[]>(`/Debt/Payments/${id}`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
