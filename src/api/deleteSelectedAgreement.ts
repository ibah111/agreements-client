import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function deleteSelectedAgreements(list: number[]) {
  return of({ list }).pipe(
    remove(baseRequest, "/Agreements"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
