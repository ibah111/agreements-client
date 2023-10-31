import { ContactLog } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";

export default function useContactColumns() {
  const columns: GridColDef<ContactLog>[] = [
    {
      field: "id",
    },
    {
      field: "parent_id",
    },
    {
      field: "r_debt_id",
    },
    {
      field: "r_phone_id",
    },
    {
      field: "dsc",
    },
    {
      field: "typ",
    },
    {
      field: "r_reg_user_id",
    },
    {
      field: "reg_dt",
    },
    {
      field: "r_debt_guarantor_id",
    },
  ];
  return columns;
}
