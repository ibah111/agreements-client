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
});
export const Root = styled(Grid)(({ theme }) => ({
  "& .super-app-theme--1": createThemeApp(theme, "info"),
  "& .super-app-theme--2": createThemeApp(theme, "success"),
  "& .super-app-theme--3": createThemeApp(theme, "error"),
}));
