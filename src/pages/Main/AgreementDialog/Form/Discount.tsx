import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Discount() {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  const full_req = useAgreementData("full_req");
  const sum = useAgreementData("sum");
  const data = useAgreementData("discount");
  //@ts-ignore
  const maths = agreement.full_req - agreement.sum;
  return (
    <Grid xs={2} item>
      <TextField
        type="number"
        label="Дисконт"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "discount",
              event.target.value ? Number(event.target.value) : "",
            ])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        value={maths}
        helperText={"Значение подсчитывается само"}
      />
    </Grid>
  );
}
