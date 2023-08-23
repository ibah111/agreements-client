import React from "react";
import getAdminUserRole, {
  User,
} from "../../../api/TableApi's/Admin/getAdminDetails";

export default function useAdminGrid() {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<User[]>([]);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const s = getAdminUserRole().subscribe(setRows);
    s.add(setLoading(false));
  }, []);
  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return { rows, refresh, loading };
}
