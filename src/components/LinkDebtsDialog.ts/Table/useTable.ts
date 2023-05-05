import { Debt } from "@contact/models";
import React from "react";
import getLinkedDebts from "../../../api/DebtLinks/getLinkedDebts";
import useColumns from "./useColumns";

export default function useTable(agreementId: number) {
  const [debts, setDebts] = React.useState<Debt[]>([]);
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    getLinkedDebts(agreementId).subscribe((res) => {
      setDebts(res);
      setLoading(false);
    });
  }, [agreementId]);
  const columns = useColumns(agreementId, refresh);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  React.useEffect(() => {
    console.log(debts);
  }, [debts]);

  return { rows: debts, refresh, loading, columns };
}
