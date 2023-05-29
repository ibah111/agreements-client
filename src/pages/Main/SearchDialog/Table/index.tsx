import {
  DataGridPremium,
  GridColDef,
  GridPinnedColumns,
} from "@mui/x-data-grid-premium";
import React from "react";
import DebtInstance from "../../../../Models/Debt";

interface TableProps {
  columns: GridColDef<DebtInstance>[];
  rows: DebtInstance[];
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
    />
  );
}
