import React from "react";
import { EventDialog } from "../../Table";
import { CommentEvents } from "../CommentTable";
interface useEditControlOptions {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}
export default function useEditControl(opts: useEditControlOptions) {
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [commentId, setCommentId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventDialog) => {
      setCommentId(e.value as number);
      setOpenEdit(true);
    }) as EventListener;
    opts.DialogTarget.addEventListener(CommentEvents.onEditComment, callback);
    return () =>
      opts.DialogTarget.removeEventListener(
        CommentEvents.onEditComment,
        callback
      );
  }, [opts.DialogTarget]);
  const handleOpenEditDialog = React.useCallback(() => {
    setOpenEdit(true);
    setCommentId(commentId);
  }, [commentId]);

  const handleCloseEditDialog = React.useCallback(() => {
    setOpenEdit(false);
    setCommentId(0);
  }, []);

  return { openEdit, commentId, handleOpenEditDialog, handleCloseEditDialog };
}
