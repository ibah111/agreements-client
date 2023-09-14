import React from "react";
import { ScheduleLinkModel } from "./ScheduleLinkModel";
import { randomInt } from "@mui/x-data-grid-generator";
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
  //TODO API REQ FOR SET ROWS
  const [rows, setRows] = React.useState<ScheduleLinkModel[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<number>(0);
  let idCounter = 0;
  const createRandomRow = () => {
    idCounter += 1;
    return {
      id: idCounter,
      id_debt: randomInt(250, 1000),
      contract: randomInt(1234534, 4356789),
      schedule_type: randomInt(1, 2),
    };
  };
  const testRows = [createRandomRow(), createRandomRow()];
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
    testRows,
    rows,
    id,
    open,
    handleCloseSchedule,
  };
}
