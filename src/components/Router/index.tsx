import WebMain from "../../Pages/Main/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "@mui/material";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebMain />} />
      </Routes>
    </BrowserRouter>
  );
}
