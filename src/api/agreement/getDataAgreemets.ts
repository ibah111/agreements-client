import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Agreement } from "../Agreement";

export default async function getDataAgreement() {
  try {
    const res = await axios.get<Agreement>(
      `http://localhost:3001//Agreements/getAgreement`
    );

    return plainToInstance(Agreement, res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Соглашение не найдено или не создано");
      console.log(error.response?.data);
    }
    throw error;
  }
}
