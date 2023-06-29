import {
  darken,
  Grid,
  lighten,
  PaletteColor,
  styled,
  Theme,
} from "@mui/material";

const getBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);
interface Palette {
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
}
const createThemeApp = (theme: Theme, color: keyof Palette) => ({
  backgroundColor: getBackgroundColor(
    theme.palette[color].main,
    theme.palette.mode
  ),
  "&:hover": {
    backgroundColor: getHoverBackgroundColor(
      theme.palette[color].main,
      theme.palette.mode
    ),
  },
  "&.Mui-selected": {
    backgroundColor: getSelectedBackgroundColor(
      theme.palette[color].main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getSelectedHoverBackgroundColor(
        theme.palette[color].main,
        theme.palette.mode
      ),
    },
  },
  "& .MuiCheckbox-root svg": {},
});
export const Root = styled(Grid)(({ theme }) => ({
  "& .super-app-theme--1": createThemeApp(theme, "info"),
  "& .super-app-theme--2": createThemeApp(theme, "success"),
  "& .super-app-theme--3": createThemeApp(theme, "error"),
  "& .super-app-theme--headerPinnedRight": {
    backgroundColor: "rgba(15, 200, 250, 0.40)",
  },
  "& .super-app-theme--headerPinnedLeft": {
    backgroundColor: "rgba(235, 42, 42, 0.40)",
  },
}));
export const correctDensity = {
  "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
  "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "15px" },
  "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": { py: "22px" },
};
