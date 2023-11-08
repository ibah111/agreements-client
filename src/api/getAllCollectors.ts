import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../utils/processError";

export class Collector {
  id: number;

  id_contact: number;

  fio: string;

  department_name: string;
}

export default function getAllCollectors() {
  return of(`/collector`).pipe(
    get<Collector[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
