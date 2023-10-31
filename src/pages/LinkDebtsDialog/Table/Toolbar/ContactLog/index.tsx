import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
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
    <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Контактная информация по должникам</DialogTitle>
      <DialogContent>
        <Grid
          sx={{
            height: 500,
          }}
        >
          <DataGridPremium {...gridProps} getRowId={(row) => row.id} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
