import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import ChooseDebtAgreement from "..";

export default function ConnectingDebts() {
  return (
    <Dialog maxWidth="lg" fullWidth open={false}>
      <DialogContent>
        <DialogTitle>Связать долг</DialogTitle>
        <Grid item xs style={{ height: 400, width: "100%" }}>
          <ChooseDebtAgreement loading={false} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
