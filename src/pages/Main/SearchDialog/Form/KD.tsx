import { Grid, TextField } from "@mui/material";
import { setContract } from "../../../../Reducer/Search";

export default function KD() {
  function dispatch(arg0: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Grid item xs={5}>
      <TextField
        size="small"
        fullWidth
        label="КД"
        onChange={(event) =>
          dispatch(setContract(["contract", String(event.target.value)]))
        }
      />
    </Grid>
  );
}
