import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Discount() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("discount_sum");
  return (
    <Grid xs={2} item>
      <TextField
        label="Дисконт"
        type="number"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "discount_sum",
              event.target.value ? Number(event.target.value) : "",
            ])
          )
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        value={data.value}
      />
    </Grid>
  );
}
