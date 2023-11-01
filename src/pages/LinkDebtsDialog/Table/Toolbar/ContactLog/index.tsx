import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import useContactLogHook from "./useContactLogHook";
import ContactLogToolbar from "./ContactLogToolbar/ContactLogToolbar";
import useContactHeight from "./useContactHeight";
interface TableProps {
  open: boolean;
  onClose: VoidFunction;
  id_agreement: number;
}
export default function ContactLogTable(props: TableProps) {
  const { ...gridProps } = useContactLogHook({
    id_agreement: props.id_agreement,
  });

  const { getRowHeight, changeRowHeight } = useContactHeight();
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Контактная информация по должникам</DialogTitle>
      <DialogContent>
        <Grid
          sx={{
            height: 500,
          }}
        >
          <DataGridPremium
            {...gridProps}
            getRowId={(row) => row.id}
            slotProps={{
              toolbar: { changeRowHeight },
            }}
            slots={{
              toolbar: ContactLogToolbar,
            }}
            getRowHeight={getRowHeight}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
