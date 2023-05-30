import { Button } from "@mui/material";
import React from "react";
interface PaymentsButtonProps {
  refresh: VoidFunction;
  debtId: number;
  handleOpen: (value: number) => void;
}
export default function PaymentsButton(props: PaymentsButtonProps) {
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          props.handleOpen(props.debtId);
        }}
      >
        Платежи
      </Button>
    </>
  );
}
