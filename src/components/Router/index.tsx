import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActionLog from "../../pages/ActionLog/actionLog";
import DeletedData from "../../pages/DeletedData/DeletedData";

import Main from "../../pages/Main";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ActionLog" element={<ActionLog />} />
        <Route path="/DeletedData" element={<DeletedData />} />
      </Routes>
    </BrowserRouter>
  );
}
