import { Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setSearchValue } from "../../../../Reducer/Search";
interface FIOprops {
  refresh: VoidFunction;
}
export default function FIO(props: FIOprops) {
  const value = useAppSelector((state) => state.Search.fio);
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
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            dispatch(setSearchValue(["fio", value]));
            props.refresh();
          }
        }}
      />
    </Grid>
  );
}
