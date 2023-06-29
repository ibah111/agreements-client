import { Dict } from "@contact/models";
import { post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function getDict(value: number) {
  return of({ id: value }).pipe(
    post<Dict[]>(baseRequest, "/dict"),
    transformAxios(),
    transformError()
  );
}
