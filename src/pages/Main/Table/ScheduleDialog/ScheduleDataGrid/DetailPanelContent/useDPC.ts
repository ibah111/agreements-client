import React from "react";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import getCalcsInMonth from "../../../../../../api/SchedulePayments/getCalcsInMonth";
interface DPCProps {
  id_payments: number;
}
export default function useDPC(props: DPCProps) {
  const [rows, setRows] = React.useState<DebtCalcInstance[]>([]);
  const request = React.useCallback(() => {
    getCalcsInMonth(props.id_payments).subscribe(setRows);
  }, [props.id_payments]);
  return { rows, request };
}
