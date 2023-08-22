import { DataGridPremium } from "@mui/x-data-grid-premium";
import columnsActionLog from "./column.actionLog";
import useLogGrid from "./useLogGrid";
import LogToolbar from "./LogToolbar";
import { Grid } from "@mui/material";

export default function LogTable() {
  const cols = columnsActionLog();
  const { rows } = useLogGrid();
  return (
    <Grid
      item
      xs
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGridPremium
        columns={cols}
        rows={rows}
        slots={{
          toolbar: LogToolbar,
        }}
      />
    </Grid>
  );
}
