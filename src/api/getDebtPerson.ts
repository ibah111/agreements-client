import { Debt } from "@contact/models";
import { plainToInstance } from "class-transformer";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export default async function getDebtPerson() {
  try {
    const res = await baseRequest.get<Debt[]>(`/Debt`);
    return plainToInstance(Debt, res.data);
  } catch (e) {
    processError(e);
    throw e;
  }
}
