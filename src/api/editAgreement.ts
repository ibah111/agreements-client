import {
  authRetry,
  patch,
  transformAxios,
  transformInstance,
} from "@tools/rxjs-pipes";
import { diff } from "deep-object-diff";
import { of } from "rxjs";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";
type UndefinedAttributes<T> = {
  [key in keyof T]?: T[key] | null;
};
export default function editAgremeent(
  data: AgreementInstance,
  old: AgreementInstance
) {
  const oldPlain = JSON.parse(JSON.stringify(old));
  const dataPlain = JSON.parse(JSON.stringify(data));
  const changed = diff(
    oldPlain,
    dataPlain
  ) as UndefinedAttributes<AgreementInstance>;
  for (const key of Object.keys(changed) as (keyof typeof changed)[]) {
    if (changed[key] === undefined) changed[key] = null;
  }
  return of(changed).pipe(
    patch<AgreementInstance>(baseRequest, `/Agreements/${data.id}`),
    transformAxios(),
    transformError(),
    authRetry(),
    transformInstance(AgreementInstance)
  );
}
