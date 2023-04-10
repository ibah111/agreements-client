import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function Discount() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid xs={2} item>
      <TextField
        label="Дисконт"
        value={agreement.discount_sum || ""}
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty(["discount_sum", Number(event.target.value)])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
      />
    </Grid>
  );
}
