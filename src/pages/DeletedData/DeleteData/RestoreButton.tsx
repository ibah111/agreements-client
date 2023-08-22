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
      maxWidth={"xl"}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>{`Удалить или восстановить соглашение ${props.id_agreement}`}</DialogTitle>
      <DialogContent>
        <Grid item container>
          <Button onClick={() => {}} color="error">{`Удалить`}</Button>
          <Button onClick={() => {}} color="success">{`Восстановить`}</Button>
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
