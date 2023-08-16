import React from "react";
import { scheduleColumns } from "./scheduleColumns";
import { Payments } from "../../../../../Models/Payments";
import { CustomEvents, EventDialog } from "../../Table";
import getSchedule from "../../../../../api/SchedulePayments/getSchedule";
import { plainToInstance } from "class-transformer";
interface useScheduleOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export default function useScheduleControl(options: useScheduleOptions) {
  const columns = scheduleColumns();
  const [openSchedule, setOpenSchedule] = React.useState(false);
  const [agreementId, setAgreementId] = React.useState<number>(0);
  const [rows, setRows] = React.useState<Payments[]>([]);

  const request = React.useCallback(() => {
    const req = getSchedule(agreementId).subscribe((res) => {
      const data = plainToInstance(Payments, res);
      setRows(data);
    });
    return req.unsubscribe.bind(req);
  }, [agreementId]);

  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setAgreementId(e.value as number);
      setOpenSchedule(true);
    }) as EventListener;
    options.DialogTarget.addEventListener(
      CustomEvents.onOpenScheduleDialog,
      callback
    );
    return () =>
      options.DialogTarget.removeEventListener(
        CustomEvents.onOpenScheduleDialog,
        callback
      );
  }, [options.DialogTarget]);

  const handleOpenSchedule = React.useCallback((agreementId: number) => {
    setOpenSchedule(true);
    setAgreementId(agreementId);
  }, []);

  const handleCloseSchedule = React.useCallback(() => {
    setOpenSchedule(false);
    setAgreementId(0);
  }, []);

  return {
    columns,
    rows,
    openSchedule,
    agreementId,
    handleOpenSchedule,
    handleCloseSchedule,
    request,
  };
}
