import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import addPayment from "../../../../api/SchedulePayments/addPayment";
import { enqueueSnackbar } from "notistack";
import { NumericFormatCustom } from "../../AgreementDialog/Form/Maths/CustomMathComponent";
interface FormProps {
  id_schedule: number;
  DialogTarget: EventTarget;
  refresh: () => void;
}
export default function ScheduleForm(props: FormProps) {
  const [sum, setSum] = React.useState<number>(0);
  const [date, setDate] = React.useState<moment.Moment>();
  const [count, setCount] = React.useState<number>(1);
  const condition = () => {
    if (sum === 0 || date === undefined) return true;
    else if (sum >= 0 || date !== undefined) return false;
  };
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
          value={sum}
          onChange={(event) => {
            setSum(Number(event.target.value));
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            inputComponent: NumericFormatCustom as any,
          }}
        />
      </Grid>
      <Grid xs={2} item>
        <TextField
          label="Количество платежей"
          value={count}
          onChange={(event) => {
            setCount(Number(event.target.value));
          }}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
        />
      </Grid>
      <Grid xs={2} item>
        <Button
          disabled={condition()}
          size="large"
          color="info"
          variant="contained"
          onClick={() => {
            addPayment({
              id_schedule: props.id_schedule,
              pay_day: date!,
              sum_owe: sum,
              status: false,
              x: count,
            }).subscribe(() => {
              enqueueSnackbar("Платёж добавлен", {
                variant: "info",
                autoHideDuration: 1000,
              });
              props.refresh();
            });
          }}
        >
          Добавить
        </Button>
      </Grid>
    </>
  );
}
