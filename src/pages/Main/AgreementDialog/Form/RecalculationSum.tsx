import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function RecalculationSum() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Сумма пересчета"
        value={agreement.recalculation_sum || ""}
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "recalculation_sum",
              Number(event.target.value),
            ])
          )
        }
      />
    </Grid>
  );
}
