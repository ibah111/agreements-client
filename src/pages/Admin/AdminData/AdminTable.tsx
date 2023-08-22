import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import useAdminGrid from "./useAdminGrid";
import columnsAdmin from "./column.Admin";
import AdminToolbar from "./AdminToolbar";
import { Grid } from "@mui/material";
import React from "react";

export default function AdminTable() {
  const { rows, render } = useAdminGrid();
  const cols = columnsAdmin();
  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    left: ["actions"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
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
        pinnedColumns={pinnedColumns}
        onPinnedColumnsChange={handlePinnedColumnsChange}
        columns={cols}
        rows={rows}
        slots={{ toolbar: AdminToolbar }}
        slotProps={{
          toolbar: { render },
        }}
      />
    </Grid>
  );
}
