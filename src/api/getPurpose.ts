import axios from "axios";
import { plainToInstance } from "class-transformer";
class Purpose {
  id: number;
  title: string;
}
export default async function getPurposes() {
  const res = await axios.get<Purpose[]>(
    `http://localhost:3001/Purpose/GetAll`
  );
  return plainToInstance(Purpose, res.data);
}
