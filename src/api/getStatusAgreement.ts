import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";
export class StatusAgreement {
  id: number;
  title: string;
}

export default async function getStatusAgreement() {
  try {
    const res = await baseRequest.get<StatusAgreement[]>(`/StatusAgreement`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
