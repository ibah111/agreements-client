import { Button, DialogContent, Grid, TextField } from "@mui/material";
import { Comments } from "../Models/Comments";
import useField from "./useField";
import { useForm } from "./useForm";
interface Props {
  onSubmit: (formData: Comments) => void;
  comments: Comments;
  onClose: VoidFunction;
}
export default function CommentForm({ comments, onClose, onSubmit }: Props) {
  const idField = useField(Comments, "id", 0);
  const commentField = useField(Comments, "comment", "");
  const formControl = useForm([idField, commentField], onSubmit, comments);
  return (
    <>
      <DialogContent>
        <Grid container direction={"column"}>
          <Grid item />
          <Grid item container>
            <Grid item>
              <TextField multiline />
            </Grid>
            <Grid item>
              <Button fullWidth onClick={() => onClose()}>{`Cancel`}</Button>
            </Grid>
            <Button
              fullWidth
              onClick={() => formControl.handleFormSubmit()}
            >{`Submit`}</Button>
          </Grid>
        </Grid>
      </DialogContent>
      ;
    </>
  );
}
