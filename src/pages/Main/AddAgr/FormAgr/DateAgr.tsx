import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function DateAgr() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.Agreement.conclusion_date);
  return (
    <Grid item xs={"auto"} style={{ marginTop: "10px" }}>
      <DatePicker
        label="Дата заключения"
        value={value}
        minDate={moment().year(2000)}
        maxDate={moment()}
        //TODO В случае ошибок переделать !value
        onChange={(value) =>
          dispatch(setAgreementProperty(["conclusion_date", value]))
        }
      />
    </Grid>
  );
}
