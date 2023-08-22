import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import useDeleteGrid from "./useDeleteGrid";
import columnDeleteData from "./column.Delete";
import React from "react";

export default function DeleteTable() {
  const { rows } = useDeleteGrid();
  const cols = columnDeleteData();
  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    right: ["Actions"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
  return (
    <DataGridPremium
      columns={cols}
      rows={rows}
      pinnedColumns={pinnedColumns}
      onPinnedColumnsChange={handlePinnedColumnsChange}
    />
  );
}
