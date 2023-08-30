import React from "react";
import { ScheduleEvents, ScheduleEventsClass } from "../scheduleTable";
import getPayment from "../../../../../../api/SchedulePayments/getPayment";

interface UpdateFormControlOptions {
  DialogTarget: EventTarget;
  onClose?: VoidFunction;
}

export default function useUpdateFormControl(
  options?: UpdateFormControlOptions
) {
  const [open, setOpen] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState<number>(0);

  const [prevDate, setPrevDate] = React.useState<Date>();
  const [prevSum, setPrevSum] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: ScheduleEventsClass) => {
      setPaymentId(e.value as number);
      setOpen(true);
      getPayment(e.value as number).subscribe((params) => {
        setPrevDate(params.pay_day);
        setPrevSum(params.sum_owe);
      });
    }) as EventListener;

    options?.DialogTarget.addEventListener(
      ScheduleEvents.onEditPayment,
      callback
    );
  }, [options?.DialogTarget, prevDate, prevSum]);

  const closeDialog = React.useCallback(() => {
    setPaymentId(0);
    setOpen(false);
    options?.onClose?.();
  }, [options]);

  return { open, closeDialog, paymentId, prevDate, prevSum };
}
