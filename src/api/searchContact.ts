import { store } from "../Reducer";
import { baseRequest } from "../utils/baseRequest";
import { of } from "rxjs";
import { transformError } from "../utils/processError";
import { Debt } from "@contact/models";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";

export default function Search() {
  const request = store.getState().Search;
  return of(request).pipe(
    post<Debt[]>(baseRequest, "/search"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
