import { GridRowId } from "@mui/x-data-grid-premium";
import { diff } from "deep-object-diff";
import { enqueueSnackbar } from "notistack";
import { Agreement } from "../Reducer/Agreement";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export class EditAgreementInput {
  id: GridRowId;
  field: string;
  value: string | number;
}
export default async function editAgremeent(data: Agreement, old: Agreement) {
  const changed = diff(old, data) as Agreement;
  try {
    for (const key of Object.keys(changed) as (keyof Agreement)[]) {
      await baseRequest.patch<boolean>(`/Agreements/${data.id}`, {
        field: key,
        value: changed[key] as string,
      });
    }
    enqueueSnackbar("Изменено", { variant: "success" }); // он здесь необходим, я не знаю как еще вызвать
    return data;
  } catch (e) {
    processError(e);
    throw e;
  }
}
