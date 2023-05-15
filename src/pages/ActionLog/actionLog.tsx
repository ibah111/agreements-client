import { Box, Button, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { Link } from "react-router-dom";

export default function ActionLog() {
  return (
    <Box>
      <Grid>
        <Button component={Link} to="/" variant="contained">
          Назад
        </Button>
      </Grid>
      <Grid>
        <DataGridPremium columns={[]} rows={[]}></DataGridPremium>
      </Grid>
    </Box>
  );
}
