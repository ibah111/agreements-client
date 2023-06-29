import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { IdTitle } from "../Models/IdTitle";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function getPurposes() {
  return of(`/Purpose`).pipe(
    get<IdTitle[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
