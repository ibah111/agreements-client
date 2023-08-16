import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";

export default function ScheduleForm() {
  return (
    <>
      <Grid>
        <Grid>
          <DatePicker />
        </Grid>
        <Grid>
          <TextField />
        </Grid>
      </Grid>
    </>
  );
}
