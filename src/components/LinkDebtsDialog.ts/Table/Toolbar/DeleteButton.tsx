import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import deleteDebtLink from "../../../../api/DebtLinks/deleteDebtLink";
interface DeleteLinkProps {
  agreementId: number;
  debtId: number;
  refresh: VoidFunction;
}
export default function DeleteButton(props: DeleteLinkProps) {
  const handleClick = React.useCallback(() => {
    deleteDebtLink(props.agreementId, props.debtId).subscribe(() => {
      enqueueSnackbar("Связь удалена", {
        variant: "warning",
      });
      props.refresh();
    });
  }, [props]);
  return (
    <Button variant="contained" onClick={handleClick}>
      Удалить
    </Button>
  );
}
