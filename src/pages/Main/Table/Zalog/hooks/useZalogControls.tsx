import React from "react";
import { CustomEvents, EventDialog } from "../../Table";

interface useZalogControlsOptions {
  DialogTarget: EventTarget;
  onClose?: VoidFunction;
}

export default function useZalogControls(options?: useZalogControlsOptions) {
  const [openZalog, setOpenZalog] = React.useState<boolean>(false);
  const [zalogAgreementId, setZalogAgreementId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setZalogAgreementId(e.value as number);
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

  const handleOpenZalog = React.useCallback((agreementIdCard: number) => {
    setZalogAgreementId(agreementIdCard);
    setOpenZalog(true);
  }, []);
  const handleCloseZalog = React.useCallback(() => {
    setZalogAgreementId(0);
    setOpenZalog(false);
    options?.onClose?.();
  }, [options]);
  return { zalogAgreementId, openZalog, handleOpenZalog, handleCloseZalog };
}
