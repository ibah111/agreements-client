import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import addComment from "../../../../../api/Comments/addComment";
interface AddCommentDialogProps {
  open: boolean;
  onClose: VoidFunction;
  agreementId: number;
}
export default function AddCommentDialog(props: AddCommentDialogProps) {
  const [text, setText] = React.useState<string>("");
  return (
    <Dialog fullWidth maxWidth={"md"} open={props.open} onClose={props.onClose}>
      <DialogTitle>{`Добавьте комментарий к соглашению ${props.agreementId}`}</DialogTitle>
      <DialogContent>
        <Grid item xs>
          <TextField
            fullWidth
            label="Доп.комм."
            type="string"
            multiline
            maxRows={6}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            addComment(text, props.agreementId).subscribe(() => {
              enqueueSnackbar("Комментарий добавлен", {
                variant: "success",
                autoHideDuration: 1000,
              });
              props.onClose();
            });
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
