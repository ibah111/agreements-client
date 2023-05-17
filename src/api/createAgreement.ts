import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { Observable } from "rxjs";
import { Agreement } from "../Models/Agreement";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import { createError, createNextDefault } from "../utils/processError";

async function create(value: AgreementInstance) {
  const data = plainToInstance(AgreementInstance, value);
  await validateOrReject(data);
  const create = await baseRequest.post<Agreement>(`/Agreements`, {
    ...data,
  });
  return create;
}

export default function createAgreement(data: AgreementInstance) {
  return new Observable((sub) => {
    create(data)
      .then(createNextDefault(sub))
      .catch(createError(sub, "Agreement"));
  });
}
