import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export default async function deleteAgreement(id: number) {
  try {
    const res = await baseRequest.delete<boolean>(`/Agreements/${id}`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
