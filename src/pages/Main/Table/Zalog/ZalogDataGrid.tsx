import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import useZalogTable from "./hooks/useZalogTable";
interface ZalogProps {
  personId: number;
}
export default function ZalogDataGrid(props: ZalogProps) {
  const { columns, rows } = useZalogTable(props.personId);
  return <DataGridPremium columns={columns} rows={rows} hideFooter />;
}
