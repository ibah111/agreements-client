import React from "react";
import { CustomEvents, EventDialog } from "../../pages/Main/Table/Table";

interface UseLinkDebtsControlOptions {
  DialogTarget: EventTarget;
  onClose?: VoidFunction;
}

export default function useLinkDebtsControl(
  options?: UseLinkDebtsControlOptions
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [personId, setPersonId] = React.useState<number>(0);
  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setPersonId(e.value as number);
      setOpen(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(CustomEvents.onOpenDialog, callback);
    return () =>
      options?.DialogTarget.removeEventListener(
        CustomEvents.onOpenDialog,
        callback
      );
  }, [options?.DialogTarget]);

  const closeDialog = React.useCallback(() => {
    setPersonId(0);
    setOpen(false);
    options?.onClose?.();
  }, [options]);

  return { open, personId, closeDialog };
}
