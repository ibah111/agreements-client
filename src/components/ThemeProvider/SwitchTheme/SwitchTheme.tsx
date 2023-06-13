import { Button } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../ThemeProvider";
export default function SwitchTheme() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <Button color="primary" onClick={() => toggleColorMode()}>
      Cменить тему
    </Button>
  );
}
