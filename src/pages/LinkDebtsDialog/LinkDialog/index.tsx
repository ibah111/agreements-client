import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
} from "@mui/material";
import React from "react";
import addDebtLink from "../../../api/DebtLinks/addDebtLink";
import getAvailableDebts from "../../../api/DebtLinks/getAvailableDebts";
import callMessage from "../../../utils/callMessage";
import useAsyncMemo from "../../../utils/asyncMemo";
import GridSelectField from "../../../components/Utils/GridSelectField";

interface LinkDialogProps {
  open: boolean;
  onClose: VoidFunction;
  agreementId: number;
}

export default function LinkDialog(props: LinkDialogProps) {
  const [error, setError] = React.useState("");
  const [selectedDebt, setSelectedDebts] = React.useState<number>(
    "" as unknown as number
  );
  React.useEffect(() => {
    if (!selectedDebt) setError("Выберите долг для связи");
    else setError("");
  }, [selectedDebt]);

  const debts = useAsyncMemo(
    () => getAvailableDebts(props.agreementId),
    [props.agreementId],
    []
  );

  const handleClose = React.useCallback(() => {
    props.onClose();
  }, [props]);

  const handleClick = React.useCallback(() => {
    if (error) {
      callMessage(error, { variant: "error" });
      return;
    }
    addDebtLink(props.agreementId, selectedDebt).subscribe(() => {
      callMessage("Долг успешно связан", { variant: "info" });
      props.onClose();
    });
  }, [error, props, selectedDebt]);

  return (
    <Dialog fullWidth maxWidth={"md"} open={props.open} onClose={handleClose}>
      <DialogTitle>Связать долг</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <GridSelectField
            error={error ? true : false}
            helperText={error}
            onChange={(debtId) => {
              if (debtId) setSelectedDebts(debtId);
            }}
            xs={12}
            sx={{ mt: 1 }}
            label={"Долг для связи"}
            value={selectedDebt}
          >
            {debts.map((debt) => (
              <MenuItem key={debt.id} value={debt.id}>
                {`ID долга: ${debt.id}, КД: ${debt.contract}, Cтатус: ${
                  debt.StatusDict?.name || ""
                },  Имя продукта: ${debt.name}, Лиц.счёт: ${
                  debt.account
                }, Сумма кредита: ${debt.debt_sum}, Полный размер кредита: ${
                  debt.total_sum
                }, Статус: ${debt.status}`}
              </MenuItem>
            ))}
          </GridSelectField>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClick}>
          Связать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
