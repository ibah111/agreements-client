import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import moment from "moment";
import useAgreementData from "../../../../Hooks/useAgreementData";
import React from "react";

export default function FinishDate() {
  const data = useAgreementData("finish_date");
  const min_fd_value = useAgreementData("conclusion_date");

  const dates = React.useMemo(
    () => ({ minDate: moment(min_fd_value.value), maxDate: moment() }),
    [min_fd_value.value]
  );
  return (
    <Grid xs={2} item>
      <DatePicker
        label="Дата завершения"
        value={data.value || null}
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
            required: false,
          },
        }}
      />
    </Grid>
  );
}
