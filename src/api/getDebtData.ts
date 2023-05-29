import { Debt } from "@contact/models";
import { Observable } from "rxjs";
import { DebtCalcInstance } from "../Models/DebtCalc";
import { baseRequest } from "../utils/baseRequest";
import processError, {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export async function getDebtPerson(id: number) {
  try {
    const res = await baseRequest.get<Debt[]>(`/Debt/${id}`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
export async function getPersonDebts(personId: number) {
  try {
    const res = await baseRequest.get<Debt[]>(`/Debt/Person/${personId}`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
export async function getDebtPayments(id: number) {
  const res = new Observable<DebtCalcInstance[]>((subscriber) => {
    baseRequest
      .get<DebtCalcInstance[]>(`/Debt/Payments/${id}`)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
  console.log(res);
  return res;
}
