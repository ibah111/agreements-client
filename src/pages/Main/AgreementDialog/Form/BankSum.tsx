import { Grid, InputAdornment, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function BankSum() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("bank_sum");

  return (
    <Grid xs={2} item>
      <TextField
        type="number"
        label="Передано банком"
        onChange={(event) => {
          dispatch(
            setAgreementProperty([
              "bank_sum",
              event.target.value ? Number(event.target.value) : "",
            ])
          );
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        value={data.value}
        error={data.error}
        required={data.required}
        helperText={data.helperText}
      />
    </Grid>
  );
}
