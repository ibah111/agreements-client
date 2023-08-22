import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { ActionLogModel } from "../../Models/RouterGridModels/ActionLog";

export default function getLogs() {
  return of("/AG/getLogs").pipe(
    get<ActionLogModel[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
