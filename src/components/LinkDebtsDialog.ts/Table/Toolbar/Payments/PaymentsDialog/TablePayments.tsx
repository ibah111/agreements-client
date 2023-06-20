import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import React from "react";
import usePayments from "./usePayments";
interface TablePaymentsProps {
  id: number;
}
export default function TablePayments({ id }: TablePaymentsProps) {
  const { columns, loading, rows } = usePayments(id);
  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    right: ["Payments", "Delete"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
  return (
    <DataGridPremium
      initialState={{
        aggregation: {
          model: {
            sum: "sum",
          },
        },
      }}
      pinnedColumns={pinnedColumns}
      onPinnedColumnsChange={handlePinnedColumnsChange}
      columns={columns}
      rows={rows}
      loading={loading}
      rowSelection={false}
      hideFooter
    />
  );
}
