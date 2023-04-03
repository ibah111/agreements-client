import { Grid, TextField } from "@mui/material";
import { setName } from "../../../../Reducer/Search";

export default function FIO() {
  function dispatch(arg0: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Grid item xs={5}>
      <TextField
        size="small"
        fullWidth
        label="ФИО"
        onChange={(event) => dispatch(setName(event.target.value))}
      />
    </Grid>
  );
}
