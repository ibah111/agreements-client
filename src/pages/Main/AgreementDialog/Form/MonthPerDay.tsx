import { Grid, TextField } from "@mui/material";
import { NumberInput } from "../../../../components/Utils/NumberInput";
import useAgreementData from "../../../../Hooks/useAgreementData";

const input = NumberInput(2);

export default function MonthPerDay() {
  const data = useAgreementData("month_pay_day");
  return (
    <Grid xs={2} item>
      <TextField
        label="Число платежа"
        value={data.value}
        onChange={(event) => {
          data.onChange(Number(event.target.value));
        }}
        error={data.error}
        required={data.required}
        helperText={data.helperText}
        InputProps={{ inputComponent: input }}
      />
    </Grid>
  );
}
