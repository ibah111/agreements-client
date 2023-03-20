import axios from "axios";
import { Agreement } from "../Reducer/Agreement";
import { baseRequest } from "../utils/baseRequest";

export default async function createAgreement(data: Agreement) {
  try {
    const create = await baseRequest.post<Agreement>(`/Agreements`, {
      ...data,
    });
    console.log(create);
    return create;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
}
