import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import useCardTable from "./hooks/useCardTable";
interface CardProps {
  agreementId: number;
}
export default function CardDataGrid(props: CardProps) {
  const { columns, rows, refresh } = useCardTable(props.agreementId);
  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return <DataGridPremium columns={columns} rows={rows} hideFooter />;
}
