import { Button } from "@mui/material";
import React from "react";
import PaymentsDialog from "./PaymentsDialog";
import usePayments from "./PaymentsDialog/usePayments";
interface PaymentsButtonProps {
  refresh: VoidFunction;
  debtId: number;
}
export default function PaymentsButton(props: PaymentsButtonProps) {
  const [open, setOpen] = React.useState(false);
  const { buttonClick } = usePayments(props.debtId);
  const handleClick = React.useCallback(() => {
    buttonClick();
    setOpen(true);
  }, [buttonClick]);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Платежи
      </Button>
      <PaymentsDialog open={open} onClose={handleClose} debtId={props.debtId} />
    </>
  );
}
