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
  const [date, setDate] = React.useState<Date>();
  const [sum, setSum] = React.useState<number>(0);
  const condition = () => {
    if (sum === 0 || date === undefined) return true;
    else if (sum! >= 0 || date !== undefined) return false;
  };
  const [prevSum, setPrevSum] = React.useState(0);
  const [prevDate, setPrevDate] = React.useState<Date>();
  React.useEffect(() => {
    getPayment(id_payment).subscribe((payment) => {
      setPrevSum(payment.sum_owe);
      setPrevDate(payment.pay_day);
    });
  });
  return (
    <Dialog open={open} onClose={refresh} fullWidth maxWidth={"sm"}>
      <DialogTitle>{`Обновить данные платежа ${id_payment}`}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={1} alignItems="baseline">
          <Grid item>
            <DatePicker
              value={moment(prevDate)}
              disabled={true}
              label="Cтарая дата платежа"
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              value={prevSum}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            >{`Старая сумма к оплате`}</TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider textAlign="center">
        <Chip label="Изменяем" />
      </Divider>
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
                editPayment(id_payment, {
                  pay_day: date!,
                  sum_owe: sum!,
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
