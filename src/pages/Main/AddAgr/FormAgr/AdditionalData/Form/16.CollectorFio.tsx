import { Grid, TextField } from "@mui/material";

export default function CollectorFio() {
  return (
    <>
      <Grid item spacing={3}>
        <TextField label="Взыскатель" type={"string"} />
      </Grid>
    </>
  );
}
