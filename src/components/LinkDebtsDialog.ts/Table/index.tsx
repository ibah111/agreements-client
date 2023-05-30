import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import LinkDialog from "../LinkDialog";
import Toolbar from "./Toolbar";
import useOpenPayments from "./Toolbar/Payments/hooks/useOpenPayments";
import TablePayments from "./Toolbar/Payments/PaymentsDialog/TablePayments";
import useColumns from "./useColumns";
import useTable from "./useTable";

interface TableProps {
  agreementId: number;
}

export default function Table(props: TableProps) {
  const { loading, rows, refresh } = useTable(props.agreementId);
  const [open, setOpen] = React.useState(false);
  const handleOpenLinks = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseLink = React.useCallback(() => {
    setOpen(false);
    refresh();
  }, [refresh]);
  const { openPayments, handleOpen, handleClose, debtId } = useOpenPayments();
  const columns = useColumns(props.agreementId, refresh, handleOpen);
  return (
    <>
      <DataGridPremium
        hideFooter
        slotProps={{ toolbar: { refresh, setOpen: handleOpenLinks } }}
        slots={{ toolbar: Toolbar }}
        rows={rows}
        columns={columns}
        loading={loading}
      />
      {open && (
        <LinkDialog
          agreementId={props.agreementId}
          onClose={handleCloseLink}
          open={open}
        />
      )}
      {openPayments && (
        <Dialog maxWidth={"xl"} open={openPayments} onClose={handleClose}>
          <DialogTitle>Внесенные платежи</DialogTitle>
          <DialogContent>
            <Grid container sx={{ height: "40vh" }}>
              <Grid item xs>
                <TablePayments id={debtId} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
