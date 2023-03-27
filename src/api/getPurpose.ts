import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";
export class Purpose {
  id: number;
  title: string;
}
export default async function getPurposes() {
  try {
    const res = await baseRequest.get<Purpose[]>(`/Purpose`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
