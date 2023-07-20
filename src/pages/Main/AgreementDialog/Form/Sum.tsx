import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Sum() {
  const dispatch = useAppDispatch();
  const full_req = useAppSelector((state) => state.Agreement.full_req);
  const data = useAgreementData("sum", { full_req });
  return (
    <Grid xs={2} item>
      <TextField
        type="number"
        label="Сумма с дисконтом"
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
