import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CommentTable from "./CommentTable";
import AddCommentDialog from "./AddComment/AddCommentDialog";

interface CommentDialogProps {
  agreementId: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function CommentDialog(props: CommentDialogProps) {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={props.open}
        onClose={props.onClose}
        sx={{ width: "100%" }}
      >
        <DialogTitle>{`Комментарии соглашения №${props.agreementId}`}</DialogTitle>
        <DialogContent>
          <Grid container sx={{ height: "40vh" }}>
            <Grid item xs>
              <CommentTable agreementId={props.agreementId} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {<AddCommentDialog open={false} onClose={props.onClose} />}
    </>
  );
}
