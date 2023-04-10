import { Grid, InputAdornment, TextField } from "@mui/material";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";

export default function DebtSum() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Сумма долга"
        value={agreement.debt_sum || ""}
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty(["debt_sum", Number(event.target.value)])
          )
        }
      />
    </Grid>
  );
}
