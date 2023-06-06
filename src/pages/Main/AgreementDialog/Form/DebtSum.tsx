import { Grid, InputAdornment, TextField } from "@mui/material";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import { useAppDispatch } from "../../../../Reducer";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function DebtSum() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("debt_sum");

  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="В пользу НБК"
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty(["debt_sum", Number(event.target.value)])
          )
        }
        value={data.value}
        error={data.error}
        required={data.required}
        helperText={data.helperText}
      />
    </Grid>
  );
}
