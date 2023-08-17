import React from "react";
import { CustomEvents, EventDialog } from "../../Table";
interface useScheduleOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export default function useScheduleControl(options?: useScheduleOptions) {
  const [openSchedule, setOpenSchedule] = React.useState(false);
  const [agreementId, setAgreementId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setAgreementId(e.value as number);
      setOpenSchedule(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(
      CustomEvents.onOpenScheduleDialog,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        CustomEvents.onOpenScheduleDialog,
        callback
      );
  }, [options?.DialogTarget]);

  const handleCloseSchedule = React.useCallback(() => {
    setOpenSchedule(false);
    setAgreementId(0);
  }, []);

  return {
    openSchedule,
    agreementId,
    handleCloseSchedule,
  };
}
