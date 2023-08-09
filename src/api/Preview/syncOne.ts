import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, patch, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";

/**
 * @returns Апдейтит конкретный соглас по id
 */
export default function syncOne(id_agreement: number) {
  return of("").pipe(
    patch(baseRequest, `Agreements/syncOne/${id_agreement}`),
    transformAxios(),
    transformError("Agreement"),
    authRetry()
  );
}
