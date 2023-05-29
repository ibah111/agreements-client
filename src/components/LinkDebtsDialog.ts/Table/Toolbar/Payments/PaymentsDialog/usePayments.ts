import { plainToInstance } from "class-transformer";
import React from "react";
import { getDebtPayments } from "../../../../../../api/getDebtData";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import usePaymentsColumns from "./usePaymentsColumns";
export default function usePayments(debtId: number) {
  const [payments, setPayments] = React.useState<DebtCalcInstance[]>([]);
  const rows = payments;
  const [loading, setLoading] = React.useState(false);
  const buttonClick = React.useCallback(async () => {
    setLoading(true);
    getDebtPayments(debtId).subscribe((res) => {
      const calcData = plainToInstance(DebtCalcInstance, res);
      setPayments(calcData);
      setLoading(false);
    });
  }, [debtId]);
  React.useEffect(() => {
    buttonClick();
  }, [buttonClick]);
  const columns = usePaymentsColumns();
  return { rows, buttonClick, loading, columns };
}
