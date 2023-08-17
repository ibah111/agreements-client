import React from "react";
import { Payments } from "../../../../../Models/Payments";
import getSchedule from "../../../../../api/SchedulePayments/getSchedule";

export default function useScheduleTable(id_agreement: number) {
  const [schedule, setSchedule] = React.useState<Payments[]>();
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    /**
     * sub
     */
    const request = getSchedule(id_agreement).subscribe(setSchedule);
    request.add(() => setLoading(false));
    return request.unsubscribe.bind(request);
  }, [id_agreement]);

  React.useEffect(() => {
    return refresh();
  }, [refresh]);

  return { rows: schedule, refresh, loading };
}
