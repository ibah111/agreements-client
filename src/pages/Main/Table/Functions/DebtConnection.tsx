import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";

export default function DebtConnection() {
  return (
    <Dialog open={false}>
      <DialogTitle>Выберить долг, чтобы привязать его в должнику</DialogTitle>
      <DialogContent>
        <DataGridPremium columns={[]} rows={[]}></DataGridPremium>
      </DialogContent>
    </Dialog>
  );
}
