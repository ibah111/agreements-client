import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import addPayment from "../../../../api/SchedulePayments/addPayment";
interface FormProps {
  id_agreement: number;
}
export default function ScheduleForm(props: FormProps) {
  const [date, setDate] = React.useState<Date>();
  const [owe, setOwe] = React.useState<number>();

  return (
    <>
      <Grid xs={3} item>
        <DatePicker
          label="Дата платежа"
          onChange={(event) => {}}
          value={date}
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          type="number"
          label="Мес.платёж"
          fullWidth
          value={owe}
          onChange={(value) => {}}
        />
      </Grid>
      <Grid xs={3} item>
        <Button color="info" variant="contained" onClick={() => {}} fullWidth>
          Добавить
        </Button>
      </Grid>
    </>
  );
}
