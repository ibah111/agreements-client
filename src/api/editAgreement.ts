import { GridRowId } from "@mui/x-data-grid-premium";
import { diff } from "deep-object-diff";
import { Observable } from "rxjs";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import { createError, createNextPlain } from "../utils/processError";

export class EditAgreementInput {
  id: GridRowId;
  field: string;
  value: string | number;
}
async function edit(data: AgreementInstance, old: AgreementInstance) {
  const changed = diff(old, data);
  for (const key of Object.keys(changed) as (keyof AgreementInstance)[]) {
    await baseRequest.patch<AgreementInstance>(`/Agreements/${data.id}`, {
      field: key,
      value: data[key] as string,
    });
  }
  return data;
}
export default function editAgremeent(
  data: AgreementInstance,
  old: AgreementInstance
) {
  return new Observable<AgreementInstance>((sub) => {
    edit(data, old).then(createNextPlain(sub)).catch(createError(sub));
  });
}
