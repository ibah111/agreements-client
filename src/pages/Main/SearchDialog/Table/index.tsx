import { DataGridPremium } from "@mui/x-data-grid-premium";
import { searchColumns } from "../searchColumns";

export default function Table() {
  return <DataGridPremium columns={searchColumns} rows={[]} />;
}
