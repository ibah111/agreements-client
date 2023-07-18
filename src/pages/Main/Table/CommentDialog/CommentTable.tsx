import { DataGridPremium } from "@mui/x-data-grid-premium";
import useCommentColumns from "./hooks/useCommentColumns";

export default function CommentTable() {
  const columns = useCommentColumns();
  return (
    <>
      <DataGridPremium columns={columns} rows={[]} />
    </>
  );
}
