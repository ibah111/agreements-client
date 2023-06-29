import { transformInstance } from "@tools/rxjs-pipes";
import React from "react";
import { getDebtPayments } from "../../../../../../api/getDebtData";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import usePaymentsColumns from "./usePaymentsColumns";
export default function usePayments(debtId: number) {
  const columns = usePaymentsColumns();
  const [payments, setPayments] = React.useState<DebtCalcInstance[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const sub = getDebtPayments(debtId)
      .pipe(transformInstance(DebtCalcInstance))
      .subscribe(setPayments);
    sub.add(() => setLoading(false));
    return sub.unsubscribe.bind(sub);
  }, [debtId]);
  return { rows: payments, loading, columns };
}
