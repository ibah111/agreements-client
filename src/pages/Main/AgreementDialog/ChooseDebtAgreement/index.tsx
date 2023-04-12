import { Debt } from "@contact/models";
import { DataGridPremium, GridColDef } from "@mui/x-data-grid-premium";
import GridButton from "./Form/GridButton";
interface TableProps {
  columns: GridColDef<Debt>[];
  rows: Debt[];
  loading: boolean;
}

export default function ChooseDebtAgreement(params: TableProps) {
  return (
    <>
      <DataGridPremium
        columns={params.columns}
        rows={params.rows}
        loading={params.loading}
      />
      <GridButton />
    </>
  );
}
