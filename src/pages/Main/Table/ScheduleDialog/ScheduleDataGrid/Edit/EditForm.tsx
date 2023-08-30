import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import editPayment from "../../../../../../api/SchedulePayments/editPayment";
import { enqueueSnackbar } from "notistack";

interface updateFormProps {
  id_payment: number;
  open: boolean;
  refresh: VoidFunction;
}

export default function UpdateForm(props: updateFormProps) {
  const [date, setDate] = React.useState<Date>();
  const [sum, setSum] = React.useState<number>();
  const condition = () => {
    if (sum === 0 || date === undefined) return true;
    else if (sum! >= 0 || date !== undefined) return false;
  };

  return (
    <Dialog open={props.open} onClose={props.refresh} fullWidth maxWidth={"sm"}>
      <DialogTitle>{`Обновить данные платежа ${props.id_payment}`}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={1} alignItems="baseline">
          <Grid item>
            <DatePicker disabled={true} />
          </Grid>
          <Grid item>
            <TextField
              disabled={true}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogContent>
        <Grid container spacing={1} alignItems="baseline">
          <Grid item>
            <DatePicker
              label="Дата платежа"
              value={date}
              onChange={(value) => {
                if (typeof value === "string") {
                } else {
                  return setDate(value!);
                }
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Мес.платёж"
              type="number"
              value={sum}
              onChange={(event) => {
                setSum(Number(event.target.value));
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={condition()}
              fullWidth
              variant="contained"
              onClick={() => {
                editPayment(props.id_payment, {
                  pay_day: date!,
                  sum_owe: sum!,
                }).subscribe(() => {
                  enqueueSnackbar("Платёж изменён", {
                    variant: "success",
                    autoHideDuration: 1500,
                  });
                  props.refresh();
                });
              }}
            >
              {`Применить изменения`}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
