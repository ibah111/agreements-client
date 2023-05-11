import { Observable } from "rxjs";
import { Agreement } from "../Models/Agreement";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import { createError, createNextDefault } from "../utils/processError";

async function create(data: AgreementInstance) {
  const create = await baseRequest.post<Agreement>(`/Agreements`, {
    ...data,
  });
  return create;
}

export default async function createAgreement(data: AgreementInstance) {
  return new Observable((sub) => {
    create(data).then(createNextDefault(sub)).catch(createError(sub));
  });
}
