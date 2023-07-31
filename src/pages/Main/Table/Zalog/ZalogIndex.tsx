import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import ZalogDataGrid from "./ZalogDataGrid";

interface ZalogDialogControl {
  open: boolean;
  onClose: VoidFunction;
  id_person: number;
  id_agreement: number;
}

export default function ZalogDialog(props: ZalogDialogControl) {
  const handleCardClose = React.useCallback(() => {
    props.onClose();
  }, [props]);
  return (
    <Dialog fullWidth maxWidth="lg" open={props.open} onClose={handleCardClose}>
      <DialogTitle align="center">{`Привяжите залог к соглашению №${props.id_agreement}, ID должника №${props.id_person} `}</DialogTitle>
      <DialogContent sx={{ height: 400, width: "100%" }}>
        <ZalogDataGrid
          id_person={props.id_person}
          id_agreement={props.id_agreement}
        />
      </DialogContent>
    </Dialog>
  );
}
