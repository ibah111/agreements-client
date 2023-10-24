import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import useAgreementData from "../../../../Hooks/useAgreementData";
import moment from "moment";

export default function OneDayPaymentDate() {
  const data = useAgreementData("one_day_payment_date");
  return (
    <Grid xs={2} item>
      <DatePicker
        label="Дата един. платежа"
        value={data.value || null}
        minDate={moment()}
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
