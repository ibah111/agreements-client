import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import useDeleteGrid from "./useDeleteGrid";
import columnDeleteData from "./column.Delete";
import React from "react";
import DeleteToolbar from "./DeleteToolbar";
import { Grid } from "@mui/material";

export default function DeleteTable() {
  const { rows, render } = useDeleteGrid();
  const cols = columnDeleteData({
    onClose: render,
  });
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
        columns={cols}
        rows={rows}
        pinnedColumns={pinnedColumns}
        onPinnedColumnsChange={handlePinnedColumnsChange}
        slots={{
          toolbar: DeleteToolbar,
        }}
        slotProps={{
          toolbar: {
            render,
          },
        }}
      />
    </Grid>
  );
}
