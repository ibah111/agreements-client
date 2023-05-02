import { Debt } from "@contact/models";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { debtColumns } from "../../AgreementDialog/ChooseDebtAgreement/Form/DebtDataGrid/DebtColumn";
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
        <Grid item xs container style={{ height: 400, width: "100%" }}>
          <DataGridPremium columns={debtColumns} rows={debts} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
