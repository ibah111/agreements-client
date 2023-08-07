import React from "react";
import getLinkedDebts from "../../../api/DebtLinks/getLinkedDebts";
import AgreementDebtsLink from "../../../Models/AgreementDebtLink";

export default function useTable(agreementId: number) {
  const [debts, setDebts] = React.useState<AgreementDebtsLink[]>([]);
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const sub = getLinkedDebts(agreementId).subscribe(setDebts);
    sub.add(() => setLoading(false));
    return sub.unsubscribe.bind(sub);
  }, [agreementId]);

  React.useEffect(() => {
    return refresh();
  }, [refresh]);

  return { rows: debts, refresh, loading };
}
