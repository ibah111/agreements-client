import { GridToolbarContainer } from "@mui/x-data-grid-premium";
import AddCommentButton from "./AddCommentButton";
import { Can } from "../../../../../casl/casl";
import { Action, Subject } from "../../../../../casl/casl.factory";

interface CommentToolbarProps {
  refresh: VoidFunction;
  setOpen: VoidFunction;
}

export default function CommentToolbar(props: CommentToolbarProps) {
  return (
    <GridToolbarContainer>
      <Can I={Action.Create} a={Subject.Comments}>
        <AddCommentButton setOpen={props.setOpen} />
      </Can>
    </GridToolbarContainer>
  );
}
