import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { enqueueSnackbar } from "notistack";
import getComments from "../../../../api/Comments/getComments";

export default function CommentActionCellItem() {
  return (
    <GridActionsCellItem
      icon={<AddCommentIcon />}
      label="openCommentDialog"
      onClick={() => {
        enqueueSnackbar("ddada", { variant: "info", autoHideDuration: 1000 });
        getComments();
      }}
    />
  );
}
