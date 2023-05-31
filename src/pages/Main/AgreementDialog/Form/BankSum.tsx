import { Grid, InputAdornment, TextField } from "@mui/material";

export default function BankSum() {
  return (
    <Grid xs={2} item>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
        label="Cумм. переданная банком"
        type="number"
      />
    </Grid>
  );
}
