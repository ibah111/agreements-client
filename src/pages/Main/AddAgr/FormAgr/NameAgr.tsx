import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setName } from "../../../../Reducer/Search";

export default function NameAgr() {
  const dispatch = useDispatch();
  return (
    <Grid>
      <TextField
        label={"ФИО"}
        size="small"
        fullWidth
        onChange={(event) => dispatch(setName(event.target.value))}
      />
    </Grid>
  );
}
