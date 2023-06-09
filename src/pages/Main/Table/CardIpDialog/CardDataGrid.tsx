import { DataGridPremium } from "@mui/x-data-grid-premium";
import useCardColumns from "./hooks/useCardColumns";
interface CardProps {
  agreementId: number;
}
export default function CardDataGrid(props: CardProps) {
  const columns = useCardColumns(props);
  return <DataGridPremium columns={columns} rows={[]} />;
}
