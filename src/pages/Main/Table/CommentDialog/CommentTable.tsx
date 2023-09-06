import { DataGridPremium } from "@mui/x-data-grid-premium";
import useCommentColumns from "./hooks/useCommentColumns";
import useCommentTable from "./hooks/useCommentTable";
import CommentToolbar from "./AddComment/CommentToolbar";
import React from "react";
import AddCommentDialog from "./AddComment/AddCommentDialog";
interface CommentTableProps {
  agreementId: number;
}
export default function CommentTable(props: CommentTableProps) {
  const { loading, rows, refresh } = useCommentTable(props.agreementId);
  const [open, setOpen] = React.useState(false);
  const handleOpenComments = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseComments = React.useCallback(() => {
    setOpen(false);
    refresh();
  }, [refresh]);
  const commentColumns = useCommentColumns(refresh);
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
    </>
  );
}
