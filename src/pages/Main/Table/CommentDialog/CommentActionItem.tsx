import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import { CustomEvents, EventDialog } from "../Table";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { enqueueSnackbar } from "notistack";

export default function CommentActionCellItem() {
  return (
    <GridActionsCellItem
      icon={<AddCommentIcon />}
      label="openCommentDialog"
      onClick={() => {
        enqueueSnackbar("ddada", { variant: "info", autoHideDuration: 1000 });
      }}
    />
  );
}
