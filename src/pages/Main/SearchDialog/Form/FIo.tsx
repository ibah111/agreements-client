import { Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setSearchValue } from "../../../../Reducer/Search";

export default function FIO() {
  const value = useAppSelector((state) => state.Agreement.FIO);
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={5}>
      <TextField
        label="ФИО"
        size="small"
        disabled={false}
        fullWidth
        value={value}
        onChange={(event) => {
          dispatch(setSearchValue(["fio", event.target.value]));
        }}
      />
    </Grid>
  );
}
