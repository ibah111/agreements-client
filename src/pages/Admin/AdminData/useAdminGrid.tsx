import React from "react";
import getAdminUserRole, {
  User_Role,
} from "../../../api/TableApi's/Admin/getAdminDetails";

export default function useAdminGrid() {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<User_Role[]>([]);
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
