import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import addPayment from "../../../../api/SchedulePayments/addPayment";
import { enqueueSnackbar } from "notistack";
interface FormProps {
  id_agreement: number;
  refresh: VoidFunction;
}
export default function ScheduleForm(props: FormProps) {
  const [sum, setSum] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date>();
  return (
    <>
      <Grid xs={2} item>
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
      <Grid xs={2} item>
        <TextField
          label="Мес.платёж"
          type="number"
          value={sum}
          onChange={(event) => {
            setSum(Number(event.target.value));
            console.log(Number(event.target.value));
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          }}
        />
      </Grid>
      <Grid xs={2} item>
        <Button
          size="large"
          color="info"
          variant="contained"
          onClick={() => {
            addPayment({
              id_agreement: props.id_agreement,
              pay_day: date!,
              sum_owe: sum,
              status: false,
            }).subscribe(() => {
              enqueueSnackbar("Платёж добавлен", {
                variant: "info",
                autoHideDuration: 1000,
              });
            });
          }}
        >
          Добавить
        </Button>
      </Grid>
    </>
  );
}
