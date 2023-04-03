import { Debt } from "@contact/models";
import React from "react";
import Search from "../../../api/searchContact";
import useSearchColumns from "./useSearchColumns";

export default function useSearchTable(
  setOpenAgreementDialog: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<Debt[]>([]);
  const columns = useSearchColumns(setOpenAgreementDialog);

  const refresh = React.useCallback(() => {
    setLoading(true);
    Search().subscribe((res) => {
      setRows(res);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  React.useEffect(() => {
    console.log(rows);
  }, [rows]);

  return { rows, loading, refresh, columns };
}
