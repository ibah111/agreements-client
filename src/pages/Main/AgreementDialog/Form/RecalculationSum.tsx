import { Grid, TextField, InputAdornment } from "@mui/material";
import { NumberInput } from "../../../../components/Utils/NumberInput";
import useAgreementData from "../../../../Hooks/useAgreementData";

const input = NumberInput();

export default function RecalculationSum() {
  const data = useAgreementData("recalculation_sum");

  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          inputComponent: input,
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Сумма пересчета"
        value={data.value}
        onChange={(event) => {
          data.onChange(Number(event.target.value));
        }}
      />
    </Grid>
  );
}
