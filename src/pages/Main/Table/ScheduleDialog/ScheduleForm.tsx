import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
interface FormProps {
  id_agreement: number;
}
export default function ScheduleForm(props: FormProps) {
  const [sum, setSum] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date>();
  return (
    <>
      <Grid xs={3} item>
        <DatePicker
          label="Дата платежа"
          value={date}
          onChange={(event) => {
            // setDate(moment(event).format("dd.mm.yyyy"));
          }}
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          type="number"
          label="Мес.платёж"
          fullWidth
          value={sum}
          defaultValue={5000}
          onChange={(event) => {}}
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
