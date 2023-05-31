import { Grid, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function Registator() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("registrator");
  return (
    <Grid item xs={2}>
      <TextField
        id="Registator"
        label="Регистратор"
        type="string"
        onChange={(event) => {
          dispatch(setAgreementProperty(["registrator", event.target.value]));
        }}
        value={data.value}
        error={data.error}
        required={data.required}
        helperText={data.helperText}
      />
    </Grid>
  );
}
