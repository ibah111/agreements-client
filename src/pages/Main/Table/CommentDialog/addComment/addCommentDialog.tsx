import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import CommentTextField from "./commentTextField";

export default function useCommentDialog() {
  return (
    <Dialog open={false}>
      <DialogTitle>Добавьте комментарий</DialogTitle>
      <DialogContent>
        <CommentTextField />
      </DialogContent>
      <Button
        variant="contained"
        color="info"
        onClick={() => {
          enqueueSnackbar("aboba", {
            variant: "default",
            autoHideDuration: 1000,
          });
        }}
      >
        Добавить
      </Button>
    </Dialog>
  );
}
