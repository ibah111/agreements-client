import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import { getDebtPayments } from "../../../../../api/getDebtData";
import TablePayments from "./PaymentsDialog/TablePayments";
import usePayments from "./PaymentsDialog/usePayments";
interface PaymentsButtonProps {
  refresh: VoidFunction;
  debtId: number;
  onClose: boolean;
}
export default function PaymentsButton(props: PaymentsButtonProps) {
  const [open, setOpen] = React.useState(false);
  const { columns, loading, rows } = usePayments(props.debtId);
  const handleClick = React.useCallback(() => {
    setOpen(true);
    getDebtPayments(props.debtId);
    console.log(`Долги по ${props.debtId}`);
  }, [props.debtId]);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Платежи
      </Button>
      {open && (
        <Dialog maxWidth={"xl"} open={open} onClose={handleClose}>
          <DialogTitle>Внесенные платежи</DialogTitle>
          <DialogContent>
            <Grid container sx={{ height: "40vh" }}>
              <Grid item xs>
                <TablePayments
                  columns={columns}
                  rows={rows}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
