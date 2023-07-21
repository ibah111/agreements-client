import { GridColDef } from "@mui/x-data-grid-premium";
import { Comments } from "../../../../../Models/Comments";

export default function useCommentColumns() {
  const commentColumns: GridColDef<Comments>[] = [
    {
      align: "center",
      headerAlign: "center",
      width: 650,
      headerName: "Комментарий",
      field: "comment",
    },
    {
      align: "center",
      headerAlign: "center",
      width: 200,
      headerName: "Автор",
      field: "user",
      valueGetter(params) {
        return params.row.User.login;
      },
    },
  ];
  return commentColumns;
}
