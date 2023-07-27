import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import moment from "moment";
import useAgreementData from "../../../../Hooks/useAgreementData";
import React from "react";
import { useAppSelector } from "../../../../Reducer";

export default function FinishDate() {
  const statusAgreement = useAppSelector(
    (state) => state.Agreement.statusAgreement
  );
  const data = useAgreementData("finish_date", { statusAgreement });
  const min_fd_value = useAppSelector(
    (state) => state.Agreement.conclusion_date
  );
  const dates = React.useMemo(
    () => ({ minDate: moment(min_fd_value), maxDate: moment() }),
    [min_fd_value]
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
            error: data.error,
            helperText: data.helperText,
            required: data.required,
          },
        }}
      />
    </Grid>
  );
}
