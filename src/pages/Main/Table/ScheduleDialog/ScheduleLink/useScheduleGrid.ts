import React from "react";
import getAllSchedulesByAgreement from "../../../../../api/SchedulePayments/getAllSchedulesByAgreement";
import { ScheduleLinkModel } from "./ScheduleLinkModel";
interface Props {
  id_agreement: number;
}
export default function useScheduleGrid(props: Props) {
  const [loading, setLoading] = React.useState(false);

  const [rows, setRows] = React.useState<ScheduleLinkModel[]>([]);

  const refresh = React.useCallback(() => {
    setLoading(true);
    getAllSchedulesByAgreement(props.id_agreement).subscribe((res) => {
      setRows(res);
      setLoading(false);
    });
  }, [props.id_agreement]);

  React.useEffect(() => {
    return refresh;
  }, [refresh]);

  return {
    loading,
    rows,
    refresh,
  };
}
