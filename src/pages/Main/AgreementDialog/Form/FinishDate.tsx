import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import moment from "moment";
import useAgreementData from "../../../../Hooks/useAgreementData";
import React from "react";

export default function FinishDate() {
  const data = useAgreementData("finish_date");
  const dates = React.useMemo(
    () => ({ minDate: moment().year(2000), maxDate: moment() }),
    []
  );
  return (
    <Grid xs={2} item>
      <DatePicker
        label="Дата завершения"
        value={data.value}
        {...dates}
        onChange={(value) => {
          if (typeof value === "string") {
          } else {
            data.onChange(value);
          }
        }}
        slotProps={{
          textField: {
            error: data.error || !data.value,
            helperText: data.helperText || "Введите дату",
            required: true,
          },
        }}
      />
    </Grid>
  );
}
