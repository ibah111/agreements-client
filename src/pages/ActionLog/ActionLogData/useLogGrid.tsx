import React from "react";
import getLogs from "../../../api/TableApi's/getLogs";
import { ActionLogModel } from "../../../Models/RouterGridModels/ActionLog";

export default function useLogGrid() {
  const [rows, setRows] = React.useState<ActionLogModel[]>([]);
  const [load, setLoad] = React.useState(false);
  const render = React.useCallback(() => {
    setLoad(true);
    const s = getLogs().subscribe(setRows);
    s.add(setLoad(false));
  }, []);

  React.useEffect(() => {
    render();
  }, [render]);
  return { rows, render, load };
}
