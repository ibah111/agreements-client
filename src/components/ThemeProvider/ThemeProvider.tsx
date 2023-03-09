import React from "react";
import {
  CssBaseline,
  ThemeProvider as ThemeProviderOrigin,
} from "@mui/material";
import createTheme from "../../lib/createTheme";
interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const theme = React.useMemo(() => createTheme(mode), [mode]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProviderOrigin theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProviderOrigin>
    </ColorModeContext.Provider>
  );
}
