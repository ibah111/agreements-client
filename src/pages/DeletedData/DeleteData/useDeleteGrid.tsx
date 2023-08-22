import React from "react";
import getDeleted from "../../../api/TableApi's/getDeleted";
import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";

export default function useDeleteGrid() {
  const [rows, setRows] = React.useState<AgreementInstance[]>([]);
  const [load, setLoad] = React.useState(false);

  const render = React.useCallback(() => {
    setLoad(true);
    const s = getDeleted().subscribe(setRows);
    s.add(setLoad(false));
  }, []);
  React.useEffect(() => {
    return render();
  }, [render]);
  return { rows };
}
