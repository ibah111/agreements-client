import { plainToInstance } from "class-transformer";
import { Agreement } from "../Reducer/Agreement";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export default async function getAgreements() {
  try {
    const res = await baseRequest.get<Agreement[]>(`/Agreements`);
    return plainToInstance(Agreement, res.data);
  } catch (e) {
    processError(e);
    throw e;
  }
}
