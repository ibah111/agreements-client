import { store } from "../Reducer";
import { baseRequest } from "../utils/baseRequest";
import { of } from "rxjs";
import { transformError } from "../utils/processError";
import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import DebtInstance from "../Models/Debt";

export default function Search() {
  const request = store.getState().Search;
  return of(request).pipe(
    post<DebtInstance[]>(baseRequest, "/search"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
