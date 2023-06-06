import { Button, Grid } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../ThemeProvider";
export default function SwitchTheme() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <Grid xs={2}>
      <Button color="secondary" onClick={() => toggleColorMode()}>
        Cменить тему
      </Button>
    </Grid>
  );
}
