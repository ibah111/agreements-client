import { Grid, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Comment() {
  const data = useAgreementData("comment");
  return (
    <Grid xs item>
      <TextField
        fullWidth
        label="Комментарий"
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
