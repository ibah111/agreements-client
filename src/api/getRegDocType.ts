import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";
export class RegDoc {
  id: number;
  title: string;
}

export default async function getRegDoc() {
  try {
    const res = await baseRequest.get<RegDoc[]>(`/RegDoc`);
    return res.data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
