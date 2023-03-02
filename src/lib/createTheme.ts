import { createTheme as createThemeOrigin, PaletteMode } from "@mui/material";
export default function createTheme(mode?: PaletteMode) {
  return createThemeOrigin({
    palette: {
      mode,
    },
    components: {
      MuiButton: { defaultProps: { color: "primary" } },
      MuiButtonGroup: {
        defaultProps: { color: "primary" },
      },
    },
  });
}
