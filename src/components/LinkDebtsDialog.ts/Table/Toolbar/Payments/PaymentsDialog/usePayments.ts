import { DebtCalc } from "@contact/models";
import React from "react";
import { getDebtPayments } from "../../../../../../api/getDebtData";
import usePaymentsColumns from "./usePaymentsColumns";

export default function usePayments(debtId: number) {
  const [payments, setPayments] = React.useState<DebtCalc[]>([]);
  const [loading, setLoading] = React.useState(false);
  const buttonClick = React.useCallback(async () => {
    (await getDebtPayments(debtId)).subscribe((res) => {
      setPayments(res);
      console.log(res);
      setLoading(false);
    });
  }, [debtId]);
  React.useEffect(() => {}, [buttonClick]);
  const columns = usePaymentsColumns();
  return { rows: payments, buttonClick, loading, columns };
}
