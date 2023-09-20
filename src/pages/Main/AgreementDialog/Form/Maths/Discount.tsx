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
  const maths = full_req - sum;
  return (
    <Grid xs={2} item>
      <TextField
        label="Дисконт"
        onChange={() =>
          dispatch(
            setAgreementProperty(["discount", maths ? Number(maths) : ""])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          inputComponent: NumericFormatCustom as any,
        }}
        value={numberRound(maths)}
        helperText={"Значение подсчитывается само"}
        disabled
      />
    </Grid>
  );
}
