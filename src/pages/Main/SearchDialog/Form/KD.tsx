import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../../../Reducer/Search";

export default function KD() {
  const dispatch = useDispatch();

  return (
    <Grid item xs={5}>
      <TextField
        size="small"
        fullWidth
        label="КД"
        onChange={(event) => {
          dispatch(setSearchValue(["contract", event.target.value]));
        }}
      />
    </Grid>
  );
}
