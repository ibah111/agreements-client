import { post } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { Collector } from "../../Models/Collector";

interface body {
  id_contact: number;
  fio: string;
  department_name: string;
}
export default function AddCollector(body: body) {
  return of(body).pipe(post<Collector>(baseRequest, ""));
}
