import { Grid, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppSelector } from "../../../../Reducer";

export default function Car() {
  const agreement_type = useAppSelector(
    (state) => state.Agreement.agreement_type
  );
  const data = useAgreementData("car", { agreement_type });
  return (
    <Grid xs item>
      <TextField
        fullWidth
        label="Машина"
        type="string"
        onChange={(event) => {
          data.onChange(event.target.value);
        }}
        value={data.value}
        helperText={data.helperText}
        error={data.error}
        required={data.required}
      />
    </Grid>
  );
}
