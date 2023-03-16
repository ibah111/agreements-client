import { baseRequest } from "./Utils/baseRequest";
export class Purpose {
  id: number;
  title: string;
}
export default async function getPurposes() {
  const res = await baseRequest.post<Purpose[]>(`/Purpose/GetAll`);
  return res.data;
}
