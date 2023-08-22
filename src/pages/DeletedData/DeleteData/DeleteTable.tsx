import { DataGridPremium } from "@mui/x-data-grid-premium";
import useDeleteGrid from "./useDeleteGrid";
import columnDeleteData from "./column.Delete";

export default function DeleteTable() {
  const { rows } = useDeleteGrid();
  const cols = columnDeleteData();
  return <DataGridPremium columns={cols} rows={rows} />;
}
