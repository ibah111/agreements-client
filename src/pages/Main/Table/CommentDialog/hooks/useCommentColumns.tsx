import { GridColDef } from "@mui/x-data-grid-premium";
import { Comments } from "../../../../../Models/Comments";
import { Typography } from "@mui/material";
export default function useCommentColumns() {
  const commentColumns: GridColDef<Comments>[] = [
    {
      align: "center",
      headerAlign: "center",
      width: 650,
      headerName: "Комментарий",
      type: "string",
      field: "comment",
      renderCell(params) {
        const tt: string = params.value;
        const tpy = tt.split(". ").join("\n");
        return <Typography>{tpy}</Typography>;
      },
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
