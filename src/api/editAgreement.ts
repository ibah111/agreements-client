import { GridRowId } from "@mui/x-data-grid-premium";
import { baseRequest } from "../utils/baseRequest";

export class EditAgreementInput {
  id: GridRowId;
  field: string;
  value: string | number;
}
export default async function editAgremeent(id: EditAgreementInput) {
  const res = await baseRequest.post<boolean>(`/Agreement/EDIT${id}`);
  return res.data;
}
