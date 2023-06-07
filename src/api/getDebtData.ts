import { Debt, DebtCalc } from "@contact/models";
import { Observable } from "rxjs";
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
export function getDebtPayments(id: number) {
  return new Observable<DebtCalc[]>((subscriber) => {
    baseRequest
      .get<DebtCalc[]>(`/Debt/Payments/${id}`)
      .then(createNextDefault(subscriber))
      .catch(createError(subscriber));
  }).pipe(createRetry());
}
