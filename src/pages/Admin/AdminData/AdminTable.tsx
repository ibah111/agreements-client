import { DataGridPremium } from "@mui/x-data-grid-premium";
import useAdminGrid from "./useAdminGrid";
import columnsAdmin from "./column.Admin";

export default function AdminTable() {
  const { rows } = useAdminGrid();
  const cols = columnsAdmin();
  return <DataGridPremium columns={cols} rows={rows} />;
}
