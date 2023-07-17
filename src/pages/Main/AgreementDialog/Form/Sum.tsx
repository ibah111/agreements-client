import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Sum() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("sum");
  return (
    <Grid xs={2} item>
      <TextField
        type="number"
        label="Размер требования"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "sum",
              event.target.value ? Number(event.target.value) : "",
            ])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
      />
    </Grid>
  );
}
