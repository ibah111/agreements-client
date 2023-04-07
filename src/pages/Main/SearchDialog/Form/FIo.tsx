import { Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../../../Reducer";

export default function FIO() {
  const value = useAppSelector((state) => state.Search.fio);
  return (
    <Grid item xs={5}>
      <TextField label="ФИО" size="small" disabled fullWidth value={value} />
    </Grid>
  );
}
