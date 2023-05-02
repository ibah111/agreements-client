import { Debt, DebtCalc } from "@contact/models";
import { store } from "../Reducer";
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
export async function getPersonDebts() {
  const request = store.getState().Agreement.personId;
  try {
    const res = await baseRequest.get<Debt[]>(`/Debt/Person/${request}`);
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
