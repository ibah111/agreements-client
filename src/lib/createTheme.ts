import { createTheme as createThemeOrigin, PaletteMode } from "@mui/material";
import { ruRU } from "@mui/material/locale";
import { ruRU as ruRUGrid } from "@mui/x-data-grid-premium";
export default function createTheme(mode?: PaletteMode) {
  return createThemeOrigin(
    {
      palette: {
        mode,
      },
      components: {
        MuiButton: { defaultProps: { color: "primary" } },
        MuiButtonGroup: {
          defaultProps: { color: "primary" },
        },
      },
    },
    ruRU,
    ruRUGrid
  );
}
