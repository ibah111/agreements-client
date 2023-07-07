import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteSelectedAgreements from "../../../../api/deleteSelectedAgreement";
import { useGridApiContext, useGridSelector } from "@mui/x-data-grid-premium";
import { GridStatePremium } from "@mui/x-data-grid-premium/models/gridStatePremium";
import callMessage from "../../../../utils/callMessage";
import { Action, Subject } from "../../../../casl/casl.factory";
import { Can } from "../../../../casl/casl";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
interface DeleteRowButtonProps {
  refresh: VoidFunction;
}
export default function DeleteRowButton(props: DeleteRowButtonProps) {
  const api = useGridApiContext();
  const rows = useGridSelector(
    api,
    (state: GridStatePremium) => state.rowSelection as number[]
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    if (!rows) {
      return callMessage("Строки не выбраны", { variant: "info" });
    } else {
      deleteSelectedAgreements(rows).subscribe(() => {
        rows.sort();
        callMessage(`Удалены строки ${rows.slice(0, 3)} и др.`, {
          variant: "info",
          autoHideDuration: 1000,
        });
        props.refresh();
        setOpen(false);
      });
    }
  };

  return (
    <Can I={Action.Delete} a={Subject.Agreement}>
      <Button
        startIcon={<DeleteIcon />}
        size="small"
        onClick={handleOpen}
        variant="contained"
        color="error"
      >
        Удалить строки
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DialogTitle align="center">Удаление нескольких строк</DialogTitle>
        <DialogContentText
          align="center"
          fontSize={20}
        >{`Вы точно хотите удалить строки по №: ${rows}`}</DialogContentText>
        <DialogActions>
          <Button
            fullWidth
            startIcon={<DeleteForeverOutlinedIcon />}
            variant="contained"
            color="error"
            onClick={handleClick}
          >
            Точно удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Can>
  );
}
