import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import Form from "./Form";
import Table from "./Table";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog(props: SearchDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
      <DialogTitle>Форма поиска</DialogTitle>
      <DialogContent>
        <Grid container direction={"column"} sx={{ height: "70vh" }}>
          <Grid item container alignItems={"center"} spacing={1} xs={1}>
            <Form />
          </Grid>
          <Grid xs style={{ height: 400, width: "100%" }}>
            <Table />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
