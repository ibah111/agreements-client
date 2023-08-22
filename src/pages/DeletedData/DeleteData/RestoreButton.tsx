import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import React from "react";
import restoreDeleted from "../../../api/TableApi's/restoreDeleted";
import { enqueueSnackbar } from "notistack";
import forceDeleted from "../../../api/TableApi's/forceDelete";

interface RestoreProps {
  id_agreement: number;
  onClose: VoidFunction;
}

export default function ActionButton(props: RestoreProps) {
  const [open, setOpen] = React.useState(false);

  const QuizDialog = () => (
    <Dialog
      open={open}
      fullWidth
      maxWidth={"sm"}
      onClose={() => setOpen(false)}
    >
      <DialogTitle align="center">{`Удалить или восстановить соглашение ${props.id_agreement}`}</DialogTitle>
      <DialogContent>
        <Grid item container>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                forceDeleted(props.id_agreement).subscribe(() => {
                  enqueueSnackbar("Соглашение удалено", {
                    variant: "warning",
                    autoHideDuration: 1000,
                  });
                  props.onClose();
                });
              }}
              color="error"
            >{`Удалить`}</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                restoreDeleted(props.id_agreement).subscribe(() => {
                  enqueueSnackbar("Соглашение восстановлено", {
                    variant: "success",
                    autoHideDuration: 1000,
                  });
                  props.onClose();
                });
              }}
              color="success"
            >{`Восстановить`}</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Tooltip title={"Восстановить"}>
        <GridActionsCellItem
          icon={<RestoreFromTrashIcon />}
          label="restore"
          onClick={() => {
            setOpen(true);
          }}
        />
      </Tooltip>
      {open && <QuizDialog />}
    </>
  );
}
