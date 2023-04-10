import { Grid, TextField, InputAdornment } from "@mui/material";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";

export default function CourtSum() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Судебная сумма"
        value={agreement.court_sum || ""}
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty(["court_sum", Number(event.target.value)])
          )
        }
      />
    </Grid>
  );
}
