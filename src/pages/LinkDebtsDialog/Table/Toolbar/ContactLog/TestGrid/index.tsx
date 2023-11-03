import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGridPremium, GridColDef } from "@mui/x-data-grid-premium";

import React from "react";
import { DebtGuarantor } from "@contact/models";
interface PhoneProps {
  open: boolean;
  onClose: VoidFunction;
}
export default function TestGrid(props: PhoneProps) {
  const columns: GridColDef<DebtGuarantor>[] = [];
  const [rows, setRows] = React.useState<DebtGuarantor[]>([]);
  React.useEffect(() => {});
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
      <DialogTitle>TestGrid</DialogTitle>
      <DialogContent>
        <DataGridPremium columns={columns} rows={rows} />
      </DialogContent>
    </Dialog>
  );
}
