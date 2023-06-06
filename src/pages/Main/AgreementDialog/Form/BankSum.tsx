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
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Передано банком"
        type="number"
        onChange={(event) => {
          dispatch(
            setAgreementProperty(["bank_sum", Number(event.target.value)])
          );
        }}
        value={data.value}
        error={data.error}
        required={data.required}
        helperText={data.helperText}
      />
    </Grid>
  );
}
