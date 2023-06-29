import { remove, transformAxios, authRetry } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function deleteAgreement(id: number) {
  return of("").pipe(
    remove<boolean>(baseRequest, `/Agreements/${id}`),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
