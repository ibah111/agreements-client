import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
/**
 *
 * @returns Апдейтит все соглашения (лучше не использовать)
 */
export default function syncAll() {
  return of("").pipe(
    post(baseRequest, "Agreements/syncAll"),
    transformAxios(),
    transformError("Agreement"),
    authRetry()
  );
}
