import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import moment from "moment";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function DateAgr() {
  const data = useAgreementData("conclusion_date");
  return (
    <Grid item xs={2}>
      <DatePicker
        label="Дата заключения"
        value={data.value}
        minDate={moment().year(2000)}
        maxDate={moment()}
        onChange={(value) => {
          if (typeof value === "string") {
          } else {
            data.onChange(value);
          }
        }}
        slotProps={{
          textField: {
            error: data.error,
            helperText: data.helperText,
            required: data.required,
          },
        }}
      />
    </Grid>
  );
}
