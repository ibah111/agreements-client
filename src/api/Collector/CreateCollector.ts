import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";

interface body {
  id_contact: number;
  fio: string;
  department_name: string;
}
export default function CreateCollector(body: body) {
  return of(body).pipe(
    post<body>(baseRequest, "/collector/createCollector"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
