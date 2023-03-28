import "reflect-metadata";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";
import MessageProvider from "./Providers/MessageProvider";
import { store } from "./Reducer";
import "./utils/crack";
import { Login } from "./components/Login";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import "moment/dist/locale/ru";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
        <Provider store={store}>
          <SnackbarProvider maxSnack={10}>
            <MessageProvider>
              <Login>
                <App />
              </Login>
            </MessageProvider>
          </SnackbarProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
