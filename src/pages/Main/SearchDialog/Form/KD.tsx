import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../Reducer";
import { setSearchValue } from "../../../../Reducer/Search";
interface KDprops {
  refresh: VoidFunction;
}
export default function KD(props: KDprops) {
  const dispatch = useDispatch();
  const value = useAppSelector((state) => state.Search.contract);
  return (
    <Grid item xs={5}>
      <TextField
        size="small"
        fullWidth
        label="КД"
        value={value}
        onChange={(event) => {
          dispatch(setSearchValue(["contract", event.target.value]));
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            dispatch(setSearchValue(["contract", value]));
            props.refresh();
          }
        }}
      />
    </Grid>
  );
}
