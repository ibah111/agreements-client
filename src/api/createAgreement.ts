import axios from "axios";
import { Agreement } from "./getAgreement";

export default async function createAgreement(data: Agreement) {
  try {
    const create = await axios.post<Agreement>(`/Agreements/CreateAgreement`, {
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
