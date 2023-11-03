import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import usePhoneColumns from "./usePhoneColumns";
import React from "react";
import { Phone } from "@contact/models";
interface PhoneProps {
  open: boolean;
  onClose: VoidFunction;
}
export default function PhoneDialog(props: PhoneProps) {
  const columns = usePhoneColumns();
  const [rows, setRows] = React.useState<Phone[]>([]);
  React.useEffect(() => {});
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
      <DialogTitle>Some dialog</DialogTitle>
      <DialogContent>
        <DataGridPremium columns={columns} rows={rows} />
      </DialogContent>
    </Dialog>
  );
}
