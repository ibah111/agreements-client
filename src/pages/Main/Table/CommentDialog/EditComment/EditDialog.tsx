import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import getComment from "../../../../../api/Comments/getComment";
import { enqueueSnackbar } from "notistack";
import editComment from "../../../../../api/Comments/editComment";

interface Props {
  open: boolean;
  onClose: VoidFunction;
  id_comment: number;
  id_agreement: number;
}
export default function EditDialog(props: Props) {
  const [comment, setComment] = React.useState<string>();
  React.useEffect(() => {
    getComment(props.id_comment).subscribe((value) =>
      setComment(value.comment!)
    );
  }, [props.id_comment]);
  function func() {
    if (comment)
      editComment(props.id_comment, {
        comment: comment,
        id_agreement: props.id_agreement,
      }).subscribe(() => {
        enqueueSnackbar("Комментарий изменен", {
          variant: "success",
        });
        props.onClose();
      });
  }
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth>
        <DialogTitle>Измените комментарий</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item xs>
              <TextField
                fullWidth
                onChange={(event) => {
                  setComment(event.target.value);
                }}
                value={comment}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    func();
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Grid container>
            <Button
              variant="contained"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  func();
                }
              }}
              onClick={() => {
                func();
              }}
            >{`Применить изменения`}</Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
