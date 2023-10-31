import { Dialog } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import useContactLogHook from "./useContactLogHook";
interface TableProps {
  open: boolean;
  onClose: VoidFunction;
  id_agreement: number;
}
export default function ContactLogTable(props: TableProps) {
  const { ...gridProps } = useContactLogHook({
    id_agreement: props.id_agreement,
  });
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DataGridPremium {...gridProps} getRowId={(row) => row.id} />;
    </Dialog>
  );
}
