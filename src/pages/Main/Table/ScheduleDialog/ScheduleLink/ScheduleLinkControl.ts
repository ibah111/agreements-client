import React from "react";
import { ScheduleLinkModel } from "./ScheduleLinkModel";
export enum ScheduleLinkDialogEvent {
  onOpenScheduleDialogCreate = "onOpenScheduleDialogCreate",
}
export class EventScheduleDialog<
  Value = number | string | object
> extends Event {
  constructor(type: ScheduleLinkDialogEvent, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
interface useGridControlOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export function ScheduleLinkControl(options: useGridControlOptions) {
  const [rows, setRows] = React.useState<ScheduleLinkModel[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<number>(0);
  React.useEffect(() => {
    const callback = ((e: EventScheduleDialog) => {
      setId(e.value as number);
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
    setId(0);
  }, []);

  return {
    rows,
    id,
    open,
    handleCloseSchedule,
  };
}
