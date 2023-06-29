import { Person } from "@contact/models";
import { transformInstance } from "@tools/rxjs-pipes";
import React from "react";
import Search from "../../../api/searchContact";
import DebtInstance from "../../../Models/Debt";
import useSearchColumns from "./useSearchColumns";

export default function useSearchTable(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPerson: React.Dispatch<React.SetStateAction<Person>>
) {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<DebtInstance[]>([]);
  const columns = useSearchColumns(setOpen, setPerson);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const sub = Search()
      .pipe(transformInstance(DebtInstance))
      .subscribe(setRows);
    sub.add(() => setLoading(false));
    return sub.unsubscribe.bind(sub);
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return { rows, loading, refresh, columns };
}
