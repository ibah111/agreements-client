import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function FullReq() {
  const agreement_type = useAppSelector(
    (state) => state.Agreement.agreement_type
  );
  const dispatch = useAppDispatch();
  const data = useAgreementData("full_req", { agreement_type });
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
