import { Agreement } from "../Models/Agreement";
import { AgreementData } from "../Reducer/Agreement/Agreement";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export default async function createAgreement(data: AgreementData) {
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
