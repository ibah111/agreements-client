import { DataGridPremium } from "@mui/x-data-grid-premium";
import useAdminGrid from "./useAdminGrid";
import columnsAdmin from "./column.Admin";
import AdminToolbar from "./AdminToolbar";

export default function AdminTable() {
  const { rows, render } = useAdminGrid();
  const cols = columnsAdmin();
  return (
    <DataGridPremium
      columns={cols}
      rows={rows}
      slots={{ toolbar: AdminToolbar }}
      slotProps={{
        toolbar: { render },
      }}
    />
  );
}
