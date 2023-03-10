import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "@mui/material";
import Main from "../../pages/Main";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
