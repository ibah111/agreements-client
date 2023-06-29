import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import useZalogTable from "./hooks/useZalogTable";
interface ZalogProps {
  agreementId: number;
}
export default function ZalogDataGrid(props: ZalogProps) {
  const { columns, rows, refresh } = useZalogTable(props.agreementId);
  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return (
    <DataGridPremium autoHeight columns={columns} rows={rows} hideFooter />
  );
}
