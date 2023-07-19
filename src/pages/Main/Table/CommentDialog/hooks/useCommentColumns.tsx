import { GridColDef } from "@mui/x-data-grid-premium";
import { Comments } from "../../../../../Models/Comments";

export default function useCommentColumns() {
  const commentColumns: GridColDef<Comments>[] = [
    {
      align: "center",
      headerAlign: "center",
      width: 150,
      headerName: "id соглашения",
      field: "id_agreement",
    },
    {
      align: "center",
      headerAlign: "center",
      width: 500,
      headerName: "Комментарий",
      field: "comment",
    },
    {
      align: "center",
      headerAlign: "center",
      width: 200,
      headerName: "Автор",
      field: "user",
    },
  ];
  return commentColumns;
}
