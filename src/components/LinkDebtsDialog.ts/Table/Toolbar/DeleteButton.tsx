import { Button } from "@mui/material";
import React from "react";
import deleteDebtLink from "../../../../api/DebtLinks/deleteDebtLink";
import { useSnackbar } from "notistack";
interface DeleteLinkProps {
  agreementId: number;
  debtId: number;
  refresh: VoidFunction;
}
export default function DeleteButton(props: DeleteLinkProps) {
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = React.useCallback(() => {
    deleteDebtLink(props.agreementId, props.debtId).subscribe(() => {
      enqueueSnackbar("Связь удалена", {
        variant: "warning",
      });
      props.refresh();
    });
  }, [enqueueSnackbar, props]);
  return (
    <Button variant="contained" onClick={handleClick} color="error">
      Удалить
    </Button>
  );
}
