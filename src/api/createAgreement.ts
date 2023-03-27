import { Agreement } from "../Reducer/Agreement";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export default async function createAgreement(data: Agreement) {
  try {
    const create = await baseRequest.post<Agreement>(`/Agreements`, {
      ...data,
    });
    return create;
  } catch (e) {
    processError(e);
    throw e;
  }
}
