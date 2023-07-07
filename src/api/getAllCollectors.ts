import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { transformError } from "../utils/processError";
import { User as UserContact } from "@contact/models";

export default function getAllCollectors() {
  return of(`/collector`).pipe(
    get<UserContact[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
