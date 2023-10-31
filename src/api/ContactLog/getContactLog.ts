import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { ContactLog } from "@contact/models";
import { transformError } from "../../utils/processError";

export default function getContactLog(id_agreement: number) {
  return of(`/ContactLog/${id_agreement}`).pipe(
    get<ContactLog[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
