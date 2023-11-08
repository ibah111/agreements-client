import React from "react";
import { AgreementCreateEvents, AgreementEventDialog } from "..";
interface useAgreementFormProps {
  DialogTarget: EventTarget;
  onClose?: () => void;
}

export default function useAddCollector(props: useAgreementFormProps) {
  const [openAddCollectorDialog, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const cb = ((e: AgreementEventDialog) => {
      setOpen(true);
    }) as EventListener;
    props.DialogTarget.addEventListener(
      AgreementCreateEvents.onAddCollector,
      cb
    );
  }, [props.DialogTarget]);

  const closeAddCollectorDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  return { openAddCollectorDialog, closeAddCollectorDialog };
}
