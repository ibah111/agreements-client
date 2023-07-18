import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CommentTable from "./CommentTable";

interface CommentDialogProps {
  agreementId: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function CommentDialog(props: CommentDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Дополнительные комментарии</DialogTitle>
      <DialogContent>
        <Grid>
          <Grid>
            <CommentTable />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
