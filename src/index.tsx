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
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SnackbarProvider maxSnack={10}>
          <MessageProvider>
            <Login>
              <App />
            </Login>
          </MessageProvider>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
