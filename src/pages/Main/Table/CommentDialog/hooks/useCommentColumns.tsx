import { GridColDef } from "@mui/x-data-grid-premium";
import { Comments } from "../../../../../Models/Comments";

export default function useCommentColumns() {
  const commentColumns: GridColDef<Comments>[] = [
    {
      headerName: "Комментарий",
      field: "comment",
    },
    {
      headerName: "id соглашения",
      field: "id_agreement",
    },
    {
      headerName: "Автор",
      field: "user",
    },
  ];
  return commentColumns;
}
