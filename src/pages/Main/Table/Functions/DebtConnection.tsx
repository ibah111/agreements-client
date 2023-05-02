import { Debt } from "@contact/models";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import ChooseDebtAgreement from "../../AgreementDialog/ChooseDebtAgreement";
interface DebtConnectionProps {
  open: boolean;
  onClose: () => void;
}
export default function DebtConnection(props: DebtConnectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [debts, setDebts] = React.useState<Debt[]>([]);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Выберить долг, чтобы привязать его в должнику</DialogTitle>
      <DialogContent>
        <Grid item xs style={{ height: 400, width: "100%" }}>
          <ChooseDebtAgreement loading={false} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
