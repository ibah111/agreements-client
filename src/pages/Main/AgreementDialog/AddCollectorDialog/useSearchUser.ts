import React from "react";
import SearchUser from "../../../../api/SearchUser/SearchUser";
import { User } from "@contact/models";
interface props {
  fio: string;
}
export default function useSearchUser({ fio }: props) {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<User[]>([]);

  const search = React.useCallback(() => {
    setLoading(true);

    const sub = SearchUser(fio).subscribe(setRows);
    sub.add(() => setLoading(false));
    return sub.unsubscribe.bind(sub);
  }, [fio]);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      search();
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [fio, search]);
  return {
    rows,
    loading,
    search,
  };
}
