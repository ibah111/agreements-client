import { Box, Button, Grid } from "@mui/material";

export default function DeletedData() {
  return (
    <Box>
      <Grid>
        <Button LinkComponent={"a"} href="/" variant="contained">
          Назад
        </Button>
      </Grid>
    </Box>
  );
}
