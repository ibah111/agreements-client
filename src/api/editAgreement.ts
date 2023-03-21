import { GridRowId } from "@mui/x-data-grid-premium";
import { baseRequest } from "../utils/baseRequest";

export class EditAgreementInput {
  id: GridRowId;
  field: string;
  value: string | number;
}
export default async function editAgremeent(data: EditAgreementInput) {
  const res = await baseRequest.patch<boolean>(`/Agreements/${data.id}`, data);
  return res.data;
}
