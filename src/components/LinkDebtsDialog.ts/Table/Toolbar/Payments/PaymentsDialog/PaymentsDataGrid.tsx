import { DataGridPremium } from "@mui/x-data-grid-premium";
import usePayments from "./usePayments";
interface DataGridProps {
  debtId: number;
}
export default function PaymentsDataGrid(props: DataGridProps) {
  const { columns, loading, rows } = usePayments(props.debtId);
  return (
    <DataGridPremium
      columns={columns}
      rows={rows}
      loading={loading}
      hideFooter
    />
  );
}
