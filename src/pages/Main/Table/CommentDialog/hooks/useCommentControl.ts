import React from "react";
import useCommentColumns from "./useCommentColumns";
import getComments from "../../../../../api/Comments/getComments";
import { plainToInstance } from "class-transformer";
import { Comments } from "../../../../../Models/Comments";
import { CustomEvents, EventDialog } from "../../Table";
interface useCommentControlOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export default function useCommentControl(options: useCommentControlOptions) {
  const commentColumns = useCommentColumns();
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [commentAgreementId, setCommentAgreementId] = React.useState<number>(0);
  const [rows, setRows] = React.useState<Comments[]>([]);
  const request = React.useCallback(() => {
    const req = getComments(commentAgreementId).subscribe((res) => {
      const data = plainToInstance(Comments, res);
      setRows(data);
    });
    return req.unsubscribe.bind(req);
  }, [commentAgreementId]);
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
    options.onClose();
  }, [options]);
  return {
    commentAgreementId,
    columns: commentColumns,
    rows,
    request,
    openCommentDialog,
    handleOpenCommentDialog,
    handleCloseCommentDialog,
  };
}
