import React from "react";

export default function useCommentControl() {
  const [columns, setColumns] = React.useState();
  const [rows, setRows] = React.useState();
  const [openCommentDialog, setOpenCommentDialog] = React.useState();
  return { columns, rows };
}
