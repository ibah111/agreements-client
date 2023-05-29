import { DataGridPremium, GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
interface TablePaymentsProps {
  columns: GridColDef<DebtCalcInstance>[];
  rows: DebtCalcInstance[];
  loading: boolean;
}
export default function TablePayments(props: TablePaymentsProps) {
  return (
    <DataGridPremium
      columns={props.columns}
      rows={props.rows}
      loading={props.loading}
      hideFooter
    />
  );
}
