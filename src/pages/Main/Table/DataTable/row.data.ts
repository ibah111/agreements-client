import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Agreement } from "../../../../Models/Agreement";
import { AgreementData } from "../../../../Reducer/Agreement/Agreement";
import { baseRequest } from "../../../../utils/baseRequest";

export default async function Rows(data: AgreementData) {
  try {
    const res = await baseRequest.post<Agreement>("/Agreements/getAll", {
      ...data,
    });
    return plainToInstance(Agreement, res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Ошибка");
    }
    throw error;
  }
}
