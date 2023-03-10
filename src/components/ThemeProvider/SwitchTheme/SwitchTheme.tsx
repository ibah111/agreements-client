import { Box, FormControlLabel, Switch, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../ThemeProvider";
export default function SwitchTheme() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={() => toggleColorMode()}
            color="default"
          />
        }
        label={"Сменить тему"}
      />
    </Box>
  );
}
