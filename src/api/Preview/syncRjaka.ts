import { authRetry, patch, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

export default function syncRjaka() {
  return of().pipe(
    patch(baseRequest, "Agreements/Rjaka_Updated_All"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
