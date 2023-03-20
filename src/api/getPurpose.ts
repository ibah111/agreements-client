import { baseRequest } from "../utils/baseRequest";
export class Purpose {
  id: number;
  title: string;
}
export default async function getPurposes() {
  const res = await baseRequest.get<Purpose[]>(`/Purpose`);
  return res.data;
}
