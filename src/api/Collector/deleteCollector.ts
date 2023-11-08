import { authRetry, remove, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function deleteCollector(id: number) {
  return of("").pipe(
    remove(baseRequest, `/collector/deleteCollector/${id}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
