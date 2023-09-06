import React from "react";
import { CustomEvents, EventDialog } from "../../Table";
interface useCommentControlOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export default function useCommentControl(options: useCommentControlOptions) {
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [commentAgreementId, setCommentAgreementId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setCommentAgreementId(e.value as number);
      setOpenCommentDialog(true);
    }) as EventListener;
    options.DialogTarget.addEventListener(
      CustomEvents.onOpenCommentDialog,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        CustomEvents.onOpenCommentDialog,
        callback
      );
  }, [options.DialogTarget]);
  const handleOpenCommentDialog = React.useCallback((agreementId: number) => {
    setOpenCommentDialog(true);
    setCommentAgreementId(agreementId);
  }, []);
  const handleCloseCommentDialog = React.useCallback(() => {
    setOpenCommentDialog(false);
    setCommentAgreementId(0);
  }, []);
  return {
    commentAgreementId,
    openCommentDialog,
    handleOpenCommentDialog,
    handleCloseCommentDialog,
  };
}
