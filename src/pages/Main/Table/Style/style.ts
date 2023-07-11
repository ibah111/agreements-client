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
export const classes = {
  red: "super-app-theme--headerPinnedLeft",
  blue: "super-app-theme--headerPinnedRight",
  green: "super-app-theme--headerUsless",
  yellow: "super-app-theme--headerTime",
};

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
  [`& .${classes.blue}`]: {
    backgroundColor: "rgba(15, 200, 250, 0.40)",
  },
  [`& .${classes.red}`]: {
    backgroundColor: "rgba(235, 42, 42, 0.40)",
  },
  [`& .${classes.yellow}`]: {
    backgroundColor: "rgba(255, 180, 0, 0.40)",
  },
  [`& .${classes.green}`]: {
    backgroundColor: "rgba(27, 159, 0, 0.40)",
  },
}));
