import { Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../../../../Reducer";

export default function CommentTextField() {
  const dispatch = useAppDispatch();
  const data = "useCommentDate";
  return (
    <Grid>
      <TextField
        fullWidth
        label="Доп.комм."
        type="string"
        multiline
        maxRows={6}
        onChange={() => {}}
      />
    </Grid>
  );
}
