import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import usePayments from "./usePayments";
interface TablePaymentsProps {
  id: number;
}
export default function TablePayments({ id }: TablePaymentsProps) {
  const { columns, loading, rows } = usePayments(id);
  return (
    <DataGridPremium
      columns={columns}
      rows={rows}
      loading={loading}
      hideFooter
      rowSelection={false}
    />
  );
}
