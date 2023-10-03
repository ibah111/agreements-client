import React from "react";
import { AgreementCreateEvents, AgreementEventDialog } from ".";
interface useAgreementFormProps {
  id_person: number;
  DialogTarget: EventTarget;
  onClose?: () => void;
}

export default function useAgreementForm(props: useAgreementFormProps) {
  const [openCar, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const cb = ((e: AgreementEventDialog) => {
      setOpen(true);
    }) as EventListener;
    props.DialogTarget.addEventListener(AgreementCreateEvents.onOpenCar, cb);
  }, [props.DialogTarget, props.id_person]);

  const closeCarDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  return { openCar, closeCarDialog };
}
