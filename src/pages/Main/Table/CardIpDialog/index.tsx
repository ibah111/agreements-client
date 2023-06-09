import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import CardDataGrid from "./CardDataGrid";

interface CardIpDialogControl {
  open: boolean;
  onClose: VoidFunction;
  agreementId: number;
}

export default function CardIpDialog(props: CardIpDialogControl) {
  const handleCardClose = React.useCallback(() => {
    props.onClose();
  }, [props]);
  return (
    <Dialog fullWidth maxWidth="md" open={props.open} onClose={handleCardClose}>
      <DialogTitle>Карточка ИП</DialogTitle>
      <DialogContent>
        <CardDataGrid agreementId={props.agreementId} />
      </DialogContent>
    </Dialog>
  );
}
