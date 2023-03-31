import { Button, Grid } from "@mui/material";
import Search from "../../../../api/searchContact";

export default function SubmitButton() {
  return (
    <Grid item xs={2}>
      <Button fullWidth variant="outlined" onClick={Search}>
        Поиск
      </Button>
    </Grid>
  );
}
