import { GridColDef } from "@mui/x-data-grid-premium";
import { Comments } from "../../../../../Models/Comments";
import { Grid } from "@mui/material";
import DeleteCommentButton from "../DeleteComment";
import { Can } from "../../../../../casl/casl";
import { Action, Subject } from "../../../../../casl/casl.factory";

export default function useCommentColumns(refresh: () => void) {
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
        if (params.row.User === null) {
          return "";
        } else {
          return params.row.User.login;
        }
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Действия",
      width: 200,
      field: "actions",
      type: "actions",
      getActions(params) {
        return [
          <Can I={Action.Delete} a={Subject.AgreementToDebt}>
            <DeleteCommentButton id_comment={params.row.id} refresh={refresh} />
          </Can>,
        ];
      },
    },
  ];
  return commentColumns;
}
