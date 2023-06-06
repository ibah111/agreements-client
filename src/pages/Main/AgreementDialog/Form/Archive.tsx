import { Grid, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function Archive() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("archive");
  return (
    <Grid item xs={2}>
      <TextField
        focused
        color="warning"
        id="Archive"
        label="Архив"
        type="string"
        onChange={(event) => {
          dispatch(setAgreementProperty(["archive", event.target.value]));
        }}
        value={data.value}
        error={data.error}
        required={data.required}
        helperText={data.helperText}
      />
    </Grid>
  );
}
