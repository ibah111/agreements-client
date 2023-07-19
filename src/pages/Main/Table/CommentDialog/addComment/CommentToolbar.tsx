import { GridToolbarContainer } from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../../components/Utils/RefreshToolbarButton";
import AddCommentButton from "./AddCommentButton";

interface CommentToolbarProps {
  refresh: VoidFunction;
  setOpen: VoidFunction;
}
export default function CommentToolbar(props: CommentToolbarProps) {
  return (
    <GridToolbarContainer>
      <RefreshToolbarButton refresh={props.refresh} />
      <AddCommentButton setOpen={props.setOpen} />
    </GridToolbarContainer>
  );
}
