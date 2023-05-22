import { Debt } from "@contact/models";
import {
  DataGridPremium,
  GridColDef,
  GridPinnedColumns,
} from "@mui/x-data-grid-premium";
import React from "react";

interface TableProps {
  columns: GridColDef<Debt>[];
  rows: Debt[];
  loading: boolean;
}

export default function Table(props: TableProps) {
  const [pinnedColumns] = React.useState<GridPinnedColumns>({
    right: ["actions"],
  });

  return (
    <DataGridPremium
      columns={props.columns}
      rows={props.rows}
      loading={props.loading}
      pinnedColumns={pinnedColumns}
      experimentalFeatures={{ lazyLoading: true }}
    />
  );
}
