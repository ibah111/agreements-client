import { Snackbar } from "@mui/material";
import { baseRequest } from "../utils/baseRequest";
import { Agreement } from "../components/Form/GetAgreements/Table/row.data";

export default async function deleteAgreements(id: number) {
  try {
    const res = await baseRequest.delete<Agreement>(
      `/Agreements/deleteAgreement/${id}`
    );
  } catch (e) {
    throw e;
  }
}
