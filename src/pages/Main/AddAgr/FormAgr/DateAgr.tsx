import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement";

export default function DateAgr() {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  return (
    <Grid>
      <DatePicker
        label="Дата заключения"
        value={agreement.conclusion_date || null}
        onChange={(value) =>
          dispatch(setAgreementProperty(["conclusion_date", value]))
        }
      />
    </Grid>
  );
}
