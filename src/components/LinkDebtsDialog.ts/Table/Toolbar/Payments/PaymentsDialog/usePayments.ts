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
    getDebtPayments(debtId).subscribe((res) => {
      setPayments(res);
      setLoading(false);
    });
  }, [debtId]);
  return { rows: payments, loading, columns };
}
