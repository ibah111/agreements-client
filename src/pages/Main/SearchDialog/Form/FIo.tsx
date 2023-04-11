import { Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../../../Reducer";

export default function FIO() {
  const value = useAppSelector((state) => state.Agreement.FIO);
  return (
    <Grid item xs={5}>
      <TextField
        label="ФИО"
        size="small"
        disabled={false}
        fullWidth
        value={value}
      />
    </Grid>
  );
}
