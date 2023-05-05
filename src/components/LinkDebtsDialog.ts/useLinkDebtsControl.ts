import React from "react";

interface UseLinkDebtsControlOptions {
  onClose?: VoidFunction;
}

export default function useLinkDebtsControl(
  options?: UseLinkDebtsControlOptions
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [personId, setPersonId] = React.useState<number>(0);

  const openDialog = React.useCallback((personId: number) => {
    setPersonId(personId);
    setOpen(true);
  }, []);

  const closeDialog = React.useCallback(() => {
    setPersonId(0);
    setOpen(false);
    options?.onClose?.();
  }, [options]);

  return { open, personId, openDialog, closeDialog };
}
