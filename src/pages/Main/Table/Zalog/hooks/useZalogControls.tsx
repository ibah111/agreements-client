import React from "react";
import { CustomEvents, EventDialog, OnOpenDialogProps } from "../../Table";

interface useZalogControlsOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}

export default function useZalogControls(options?: useZalogControlsOptions) {
  const [openZalog, setOpenZalog] = React.useState<boolean>(false);

  const [agreementId, setAgrementId] = React.useState<number>(0);

  const [personId, setPersonId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventDialog<OnOpenDialogProps>) => {
      setAgrementId(e.value.agreementId);
      setPersonId(e.value.personId);
      setOpenZalog(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(
      CustomEvents.onOpenZalogDialog,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        CustomEvents.onOpenZalogDialog,
        callback
      );
  }, [options?.DialogTarget]);

  const handleOpenZalog = React.useCallback((num: number) => {
    setAgrementId(num);
    setOpenZalog(true);
  }, []);
  const handleCloseZalog = React.useCallback(() => {
    setAgrementId(0);
    setOpenZalog(false);
    options?.onClose?.();
  }, [options]);
  return {
    personId,
    agreementId,
    openZalog,
    handleOpenZalog,
    handleCloseZalog,
  };
}
