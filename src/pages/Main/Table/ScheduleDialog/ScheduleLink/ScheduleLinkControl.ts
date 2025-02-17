import React from "react";
export class EventScheduleDialog<
  Value = number | string | object
> extends Event {
  constructor(type: ScheduleLinkDialogEvent, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export enum ScheduleLinkDialogEvent {
  onOpenScheduleDialogCreate = "onOpenScheduleDialogCreate",
}
interface useGridControlOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export function ScheduleLinkControl(options: useGridControlOptions) {
  const [open, setOpen] = React.useState(false);
  const [scheduleId, setScheduleId] = React.useState<number>(0);
  React.useEffect(() => {
    const callback = ((e: EventScheduleDialog) => {
      setScheduleId(e.value as number);
      setOpen(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(
      ScheduleLinkDialogEvent.onOpenScheduleDialogCreate,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        ScheduleLinkDialogEvent.onOpenScheduleDialogCreate,
        callback
      );
  }, [options?.DialogTarget]);

  const handleCloseSchedule = React.useCallback(() => {
    setOpen(false);
  }, []);

  return {
    scheduleId,
    open,
    handleCloseSchedule,
  };
}
