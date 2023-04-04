import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setName } from "../../../../Reducer/Search";

export default function FIO() {
  // ? правка
  const dispatch = useDispatch();

  return (
    <Grid item xs={5}>
      <TextField
        label="ФИО"
        size="small"
        fullWidth
        onChange={(event) => dispatch(setName(event.target.value))}
      />
    </Grid>
  );
}
