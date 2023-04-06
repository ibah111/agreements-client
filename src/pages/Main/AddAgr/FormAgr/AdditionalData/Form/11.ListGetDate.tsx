import { Grid, TextField } from "@mui/material";

export default function ListGetDate() {
  return (
    <>
      <Grid item spacing={3}>
        <TextField label="Дата получения листа" />
      </Grid>
    </>
  );
}
