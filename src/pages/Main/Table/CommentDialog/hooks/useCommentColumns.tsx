import { GridColDef } from "@mui/x-data-grid-premium";
import { Comments } from "../../../../../Models/Comments";
import { Grid } from "@mui/material";
export default function useCommentColumns() {
  const commentColumns: GridColDef<Comments>[] = [
    {
      align: "left",
      headerAlign: "center",
      width: 650,
      headerName: "Комментарий",
      field: "comment",
      resizable: true,
      flex: 1,

      renderCell(params) {
        const tt: string = params.value;
        const tpy = tt.split(". ").join(" ");
        return (
          <Grid
            sx={{
              whiteSpace: "break-spaces",
            }}
          >
            {tpy}
          </Grid>
          // <pre style={{ overflow: "hidden" }}>{tpy}</pre>
        );
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
