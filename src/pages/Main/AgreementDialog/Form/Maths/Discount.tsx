import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../Reducer";
import { setAgreementProperty } from "../../../../../Reducer/Agreement/Agreement";
import { numberRound } from "../../../../../utils/numberRound";
import { NumericFormatCustom } from "./CustomMathComponent";

export default function Discount() {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  const full_req = agreement.full_req || 0;
  const sum = agreement.sum || 0;
  const condition = (value: number): number => {
    if (value > 0) return maths;
    return 0;
  };
  const maths = full_req - sum;
  const f_val = numberRound(condition(sum));
  return (
    <Grid xs={2} item>
      <TextField
        label="Дисконт"
        onChange={() => {
          dispatch(
            setAgreementProperty(["discount", f_val ? Number(f_val) : 0])
          );
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          inputComponent: NumericFormatCustom as any,
        }}
        value={f_val}
        helperText={"Значение подсчитывается само"}
        disabled
      />
    </Grid>
  );
}
