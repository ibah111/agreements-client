import React from "react";
import { CustomEvents, EventDialog } from "../../Table";

interface useCardControlsOptions {
  DialogTarget: EventTarget;
  onClose?: VoidFunction;
}

export default function useCardControls(options?: useCardControlsOptions) {
  const [openCard, setOpenCard] = React.useState<boolean>(false);
  const [agreementIdCard, setAgreementIdCard] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setAgreementIdCard(e.value as number);
      setOpenCard(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(
      CustomEvents.onOpenCardDialog,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        CustomEvents.onOpenCardDialog,
        callback
      );
  }, [options?.DialogTarget]);

  const handleOpenCard = React.useCallback((agreementIdCard: number) => {
    setAgreementIdCard(agreementIdCard);
    setOpenCard(true);
  }, []);
  const handleCloseCard = React.useCallback(() => {
    setAgreementIdCard(0);
    setOpenCard(false);
    options?.onClose?.();
  }, [options]);
  return { openCard, agreementIdCard, handleOpenCard, handleCloseCard };
}
