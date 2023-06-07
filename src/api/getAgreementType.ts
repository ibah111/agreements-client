import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";
export class AgreementType {
  id: number;
  title: string;
}

export default async function getAgreementType() {
  try {
    const res = await baseRequest.get<AgreementType[]>(`/Type`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
