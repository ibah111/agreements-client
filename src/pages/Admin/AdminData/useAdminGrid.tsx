import React from "react";
import getAdminUserRole, {
  User,
} from "../../../api/TableApi's/Admin/getAdminDetails";
import { EventDialog } from "../../Main/Table/Table";
import { AdminEvents } from "./AdminTable";

interface useAdminControl {
  DialogTarget: EventTarget;
  refresh: VoidFunction;
}

export default function useAdminGrid(options?: useAdminControl) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<User[]>([]);
  const [userId, setUserId] = React.useState<number>(0);
  const render = React.useCallback(() => {
    setLoading(true);
    const s = getAdminUserRole().subscribe(setRows);
    s.add(setLoading(false));
  }, []);
  React.useEffect(() => {
    render();
  }, [render]);

  return { rows, render, loading };
}
