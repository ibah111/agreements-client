import { Grid, TextField, InputAdornment } from "@mui/material";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import { useAppDispatch } from "../../../../Reducer";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function CourtSum() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("court_sum");
  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Судебная сумма"
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty(["court_sum", Number(event.target.value)])
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
