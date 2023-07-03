import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function DiscountSum() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("discount_sum");
  return (
    <Grid xs={2} item>
      <TextField
        label="Cумма с дисконтом"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "discount_sum",
              event.target.value ? Number(event.target.value) : "",
            ])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        type="number"
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
      />
    </Grid>
  );
}
