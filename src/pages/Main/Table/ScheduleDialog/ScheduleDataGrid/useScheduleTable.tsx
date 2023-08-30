import React from "react";
import { Payments } from "../../../../../Models/Payments";
import getSchedule from "../../../../../api/SchedulePayments/getSchedule";
import { scheduleColumns } from "./scheduleColumns";

export default function useScheduleTable(id_agreement: number) {
  const [schedule, setSchedule] = React.useState<Payments[]>();
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const request = getSchedule(id_agreement).subscribe(setSchedule);
    request.add(() => setLoading(false));
    return request.unsubscribe.bind(request);
  }, [id_agreement]);
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const columns = scheduleColumns(refresh, DialogTarget);

  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return { rows: schedule, refresh, loading, columns };
}
