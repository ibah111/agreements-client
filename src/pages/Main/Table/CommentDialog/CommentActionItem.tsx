import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { enqueueSnackbar } from "notistack";
import { CustomEvents, EventDialog } from "../Table";
interface CommentsProps {
  refresh: VoidFunction;
  agreement_id: number;
  eventTarget: EventTarget | null;
}
export default function CommentActionCellItem(props: CommentsProps) {
  return (
    <GridActionsCellItem
      icon={<AddCommentIcon />}
      label="openCommentDialog"
      onClick={() => {
        enqueueSnackbar("Открываю комментарии", {
          variant: "info",
          autoHideDuration: 1000,
        });
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenCommentDialog, props.agreement_id)
        );
      }}
    />
  );
}
