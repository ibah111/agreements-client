import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import ChooseDebtAgreement from "../../AgreementDialog/ChooseDebtAgreement";
interface DebtConnectionProps {
  open: boolean;
  onClose: () => void;
  personId: number;
}
export default function DebtConnection(props: DebtConnectionProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Выберите долг, чтобы привязать его в должнику</DialogTitle>
      <DialogContent>
        <Grid item xs style={{ height: 400, width: "100%" }}>
          <ChooseDebtAgreement personId={props.personId} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
