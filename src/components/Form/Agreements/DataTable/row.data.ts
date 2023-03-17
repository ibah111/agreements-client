import axios from "axios";
import { plainToInstance } from "class-transformer";
import { baseRequest } from "../../../../utils/baseRequest";
import { Agreement } from "../../../../api/getAgreement";

export default async function Rows(data: Agreement) {
  try {
    const res = await baseRequest.post<Agreement>("/Agreements/getAll", {
      ...data,
    });
    return plainToInstance(Agreement, res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Ошибка");
      console.log(error.response?.data);
    }
    throw error;
  }
}
