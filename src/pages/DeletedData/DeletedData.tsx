import { Box, Button, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";

export default function DeletedData() {
  return (
    <Box>
      <Grid item container>
        <Grid>
          <Button LinkComponent={"a"} href="/" variant="contained">
            Назад"
          </Button>
        </Grid>
        <Grid>
          <DataGridPremium columns={[]} rows={[]}></DataGridPremium>
        </Grid>
      </Grid>
    </Box>
  );
}
