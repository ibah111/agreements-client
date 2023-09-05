import React from "react";
import { ScheduleEvents, ScheduleEventsClass } from "../../ScheduleDialog";

interface UpdateFormControlOptions {
  DialogTarget: EventTarget;
  onClose?: VoidFunction;
}

export default function useUpdateFormControl(
  options?: UpdateFormControlOptions
) {
  const [open, setOpen] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: ScheduleEventsClass) => {
      setPaymentId(e.value as number);
      setOpen(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(
      ScheduleEvents.onEditPayment,
      callback
    );
  }, [options?.DialogTarget, paymentId]);

  const closeDialog = React.useCallback(() => {
    setPaymentId(0);
    setOpen(false);
    options?.onClose?.();
  }, [options]);

  return {
    open,
    closeDialog,
    paymentId,
  };
}
