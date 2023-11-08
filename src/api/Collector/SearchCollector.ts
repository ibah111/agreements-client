import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { User } from "@contact/models";
import { transformError } from "../../utils/processError";

export default function SearchCollector(fio: string) {
  return of({ fio }).pipe(
    post<User[]>(baseRequest, "/collector/searchUser"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
