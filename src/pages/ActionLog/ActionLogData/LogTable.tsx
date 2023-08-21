import { DataGridPremium } from "@mui/x-data-grid-premium";
import columnsActionLog from "./column.actionLog";
import useLogGrid from "./useLogGrid";

export default function LogTable() {
  const cols = columnsActionLog();
  const { rows } = useLogGrid();
  return <DataGridPremium columns={cols} rows={rows} />;
}
