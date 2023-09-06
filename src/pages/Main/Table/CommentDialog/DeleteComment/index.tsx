import { Delete } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import deleteComment from "../../../../../api/Comments/deleteComment";
import { enqueueSnackbar } from "notistack";

interface Props {
  id_comment: number;
  refresh: VoidFunction;
}
export default function DeleteCommentButton({ id_comment, refresh }: Props) {
  return (
    <GridActionsCellItem
      label="delete"
      icon={<Delete />}
      onClick={() => {
        deleteComment(id_comment).subscribe(() => {
          enqueueSnackbar("Комментарий удалён", {
            variant: "info",
          });
          refresh();
        });
      }}
    />
  );
}
