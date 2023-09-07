import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
  InputAdornment,
  Divider,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import editPayment from "../../../../../../api/SchedulePayments/editPayment";
import { enqueueSnackbar } from "notistack";
import getPayment from "../../../../../../api/SchedulePayments/getPayment";
import moment from "moment";

interface updateFormProps {
  id_payment: number;
  open: boolean;
  refresh: VoidFunction;
}

export default function UpdateForm({
  refresh,
  id_payment,
  open,
}: updateFormProps) {
  const condition = () => {
    if (prevSum === 0 || prevDate === undefined) return true;
    else if (prevSum! >= 0 || prevDate !== undefined) return false;
  };
  const [prevSum, setPrevSum] = React.useState(0);
  const [prevDate, setPrevDate] = React.useState<moment.Moment>();
  React.useEffect(() => {
    getPayment(id_payment).subscribe((payment) => {
      setPrevSum(payment.sum_owe);
      setPrevDate(payment.pay_day);
    });
  });
  return (
    <Dialog open={open} onClose={refresh} fullWidth maxWidth={"sm"}>
      <DialogTitle>{`Обновить данные платежа ${id_payment}`}</DialogTitle>
      <Divider textAlign="center">
        <Chip label="Изменяем" />
      </Divider>
      <DialogContent>
        <Grid container spacing={1} alignItems="baseline">
          <Grid item>
            <DatePicker
              label="Дата платежа"
              value={moment(prevDate)}
              onChange={(value) => {
                if (typeof value === "string") {
                } else {
                  return setPrevDate(value!);
                }
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Мес.платёж"
              type="number"
              value={prevSum}
              onChange={(event) => {
                setPrevSum(Number(event.target.value));
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
                editPayment(id_payment, {
                  pay_day: prevDate!,
                  sum_owe: prevSum!,
                }).subscribe(() => {
                  enqueueSnackbar("Платёж изменён", {
                    variant: "success",
                    autoHideDuration: 1500,
                  });
                  refresh();
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
