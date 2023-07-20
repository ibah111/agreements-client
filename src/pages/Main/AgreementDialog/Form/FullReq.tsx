import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function FullReq() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("full_req");
  return (
    <Grid xs={2} item>
      <TextField
        type="number"
        label="Полный размер требования"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "full_req",
              event.target.value ? Number(event.target.value) : "",
            ])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        value={data.value}
        helperText={data.helperText}
        required={data.required}
        error={data.error}
      />
    </Grid>
  );
}
