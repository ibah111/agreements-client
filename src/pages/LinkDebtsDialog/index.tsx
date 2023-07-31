import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import Table from "./Table";

interface LinkDebtsDialogProps {
  open: boolean;
  onClose: VoidFunction;
  agreementId: number;
}

export default function LinkDebtsDialog(props: LinkDebtsDialogProps) {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"xl"}
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>{`Связанные долги на соглашение №${props.agreementId}`}</DialogTitle>
        <DialogContent>
          <Grid container sx={{ height: "40vh" }}>
            <Grid item xs>
              <Table agreementId={props.agreementId} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
