import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActionLog from "../../pages/ActionLog";
import AdminPanelIndex from "../../pages/Admin";
import DeletedDataIndex from "../../pages/DeletedData";
import Main from "../../pages/Main";

export default function Router() {
  return (
    <BrowserRouter basename="/apps/agreements">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Admin" element={<AdminPanelIndex />} />
        <Route path="/ActionLog" element={<ActionLog />} />
        <Route path="/DeletedData" element={<DeletedDataIndex />} />
      </Routes>
    </BrowserRouter>
  );
}
