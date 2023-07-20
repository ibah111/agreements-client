import { GridToolbarContainer } from "@mui/x-data-grid-premium";
import AddCommentButton from "./AddCommentButton";

interface CommentToolbarProps {
  refresh: VoidFunction;
  setOpen: VoidFunction;
}
export default function CommentToolbar(props: CommentToolbarProps) {
  return (
    <GridToolbarContainer>
      <AddCommentButton setOpen={props.setOpen} />
    </GridToolbarContainer>
  );
}
