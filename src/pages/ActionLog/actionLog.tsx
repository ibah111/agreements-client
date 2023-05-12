import { Box, Button, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";

export default function ActionLog() {
  return (
    <Box>
      <Grid>
        <Button LinkComponent={"a"} href="/" variant="contained">
          Назад
        </Button>
      </Grid>
      <Grid>
        <DataGridPremium columns={[]} rows={[]}></DataGridPremium>
      </Grid>
    </Box>
  );
}
