import React from "react";
import { CustomEvents, EventDialog } from "../../Table";

interface useDeleteControlOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export default function useDeleteControl(options: useDeleteControlOptions) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteAgreementId, setDeleteAgreementId] = React.useState<number>(0);
  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setDeleteAgreementId(e.value as number);
      setOpenDeleteDialog(true);
    }) as EventListener;
    options.DialogTarget.addEventListener(
      CustomEvents.onOpenDeleteDialog,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        CustomEvents.onOpenDeleteDialog,
        callback
      );
  }, [options.DialogTarget]);
  const handleOpenDeleteDialog = React.useCallback((agreementId: number) => {
    setOpenDeleteDialog(true);
    setDeleteAgreementId(agreementId);
  }, []);
  const handleCloseDeleteDialog = React.useCallback(() => {
    setOpenDeleteDialog(false);
    setDeleteAgreementId(0);
    options.onClose();
  }, [options]);
  return {
    deleteAgreementId,
    openDeleteDialog,
    handleCloseDeleteDialog,
    handleOpenDeleteDialog,
  };
}
