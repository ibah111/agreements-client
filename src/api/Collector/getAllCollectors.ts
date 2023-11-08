import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import { Collector } from "../../Models/Collector";

export default function getAllCollectors() {
  return of(`/collector`).pipe(
    get<Collector[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
