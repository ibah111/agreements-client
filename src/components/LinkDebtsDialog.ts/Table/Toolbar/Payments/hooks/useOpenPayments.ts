import React from "react";

export default function useControlPayments() {
  const [openPayments, setOpenPayments] = React.useState(false);
  const [debtId, setDebtId] = React.useState<number>(0);
  const handleOpen = React.useCallback((debtId: number) => {
    setDebtId(debtId);
    setOpenPayments(true);
    console.log("Открываю платежи");
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenPayments(false);
  }, []);
  return { openPayments, handleOpen, handleClose, debtId };
}
