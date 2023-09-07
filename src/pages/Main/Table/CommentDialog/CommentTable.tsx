import { DataGridPremium } from "@mui/x-data-grid-premium";
import useCommentColumns from "./hooks/useCommentColumns";
import useCommentTable from "./hooks/useCommentTable";
import CommentToolbar from "./AddComment/CommentToolbar";
import React from "react";
import AddCommentDialog from "./AddComment/AddCommentDialog";
import EditDialog from "./EditComment/EditDialog";
import useEditControl from "./EditComment/editDialogControl";
export class CommentEventsClass<
  Value = number | string | object
> extends Event {
  constructor(type: CommentEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export enum CommentEvents {
  onEditComment = "onEditComment",
}
interface CommentTableProps {
  agreementId: number;
}
export default function CommentTable(props: CommentTableProps) {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { loading, rows, refresh } = useCommentTable(props.agreementId);
  const [open, setOpen] = React.useState(false);
  const handleOpenComments = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseComments = React.useCallback(() => {
    setOpen(false);
    refresh();
  }, [refresh]);
  const commentColumns = useCommentColumns(refresh, DialogTarget);
  const editControl = useEditControl({
    DialogTarget,
    onClose: refresh,
  });
  return (
    <>
      <DataGridPremium
        loading={loading}
        columns={commentColumns}
        rows={rows}
        hideFooter
        slots={{ toolbar: CommentToolbar }}
        slotProps={{ toolbar: { setOpen: handleOpenComments, refresh } }}
        getRowHeight={() => "auto"}
      />
      {open && (
        <AddCommentDialog
          open={open}
          onClose={handleCloseComments}
          agreementId={props.agreementId}
        />
      )}
      {editControl.openEdit && (
        <EditDialog
          id_agreement={props.agreementId}
          open={editControl.openEdit}
          onClose={editControl.handleCloseEditDialog}
          id_comment={editControl.commentId}
        />
      )}
    </>
  );
}
