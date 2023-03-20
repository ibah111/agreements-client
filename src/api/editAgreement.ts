import { GridRowId } from "@mui/x-data-grid-premium";
import axios from "axios";

export class EditAgreementInput {
  id: GridRowId;
  field: string;
  value: string | number;
}
export default async function editAgremeent(value: EditAgreementInput) {
  const res = await axios.post<boolean>(`/Agreement/Edit/{id}`, value);
  return res.data;
}
