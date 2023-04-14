import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ChooseDebtAgreement from "../ChooseDebtAgreement";

export default function ConnectingDebts() {
  return (
    <Dialog maxWidth="lg" fullWidth open={false}>
      <DialogContent>
        <DialogTitle>Связать долг</DialogTitle>
        <ChooseDebtAgreement loading={false} />
      </DialogContent>
    </Dialog>
  );
}
