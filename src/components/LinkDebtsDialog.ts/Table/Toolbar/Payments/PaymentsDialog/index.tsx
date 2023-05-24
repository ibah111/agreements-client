import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import PaymentsDataGrid from "./PaymentsDataGrid";

interface PaymentsDialogProps {
  open: boolean;
  onClose: () => void;
  debtId: number;
}
export default function PaymentsDialog(props: PaymentsDialogProps) {
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth={"xl"}>
        <DialogTitle>Внесенные платежи</DialogTitle>
        <DialogContent>
          <Grid container sx={{ height: "40vh" }}>
            <Grid item xs>
              <PaymentsDataGrid debtId={props.debtId} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
