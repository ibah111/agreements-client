import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import ZalogDataGrid from "./ZalogDataGrid";

interface ZalogDialogControl {
  open: boolean;
  onClose: VoidFunction;
  personId: number;
}

export default function ZalogDialog(props: ZalogDialogControl) {
  const handleCardClose = React.useCallback(() => {
    props.onClose();
  }, [props]);
  return (
    <Dialog fullWidth maxWidth="sm" open={props.open} onClose={handleCardClose}>
      <DialogTitle align="center">Залог</DialogTitle>
      <DialogContent>
        <ZalogDataGrid personId={props.personId} />
      </DialogContent>
    </Dialog>
  );
}
