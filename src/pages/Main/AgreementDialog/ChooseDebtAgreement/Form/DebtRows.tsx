import axios from "axios";
import { plainToInstance } from "class-transformer";
import Debt from "../../../../../../Models/Debt";
import { baseRequest } from "../../../../../../utils/baseRequest";

export default async function DebtRows(data: Debt) {
  try {
    const res = await baseRequest.post<Debt>("/Debt/getDebts", {
      ...data,
    });
    return plainToInstance(Debt, res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Ошибка");
    }
    throw error;
  }
}
