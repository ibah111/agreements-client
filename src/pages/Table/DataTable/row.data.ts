import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Agreement } from "../../../Reducer/Agreement";
import { baseRequest } from "../../../utils/baseRequest";

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
