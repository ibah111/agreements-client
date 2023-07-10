import { Grid, TextField, InputAdornment } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function RecalculationSum() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("recalculation_sum");
  return (
    <Grid xs={2} item>
      <TextField
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Пересчет/Индексация"
        value={data.value}
        onChange={(event) => {
          dispatch(
            setAgreementProperty([
              "recalculation_sum",
              event.target.value ? Number(event.target.value) : "",
            ])
          );
        }}
      />
    </Grid>
  );
}
