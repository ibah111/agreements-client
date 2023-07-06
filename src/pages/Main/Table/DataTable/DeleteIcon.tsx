import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import deleteAgreement from "../../../../api/deleteAgreement";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import { useSnackbar } from "notistack";

interface DeleteIconProps {
  id: number;
  refresh: () => void;
}
export default function DeleteButton(props: DeleteIconProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleClick = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Tooltip title="Удалить соглашение">
        <GridActionsCellItem
          label="Delete"
          icon={<DeleteForeverIcon />}
          onClick={handleClick}
          size="small"
          color="inherit"
        />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {`Вы уверены, что хотите удалить соглашение №${props.id}`}
        </DialogTitle>
        <DialogContent>
          <Button
            fullWidth
            startIcon={<DeleteForeverIcon />}
            variant="contained"
            color="error"
            onClick={() =>
              deleteAgreement(props.id).subscribe(() => {
                props.refresh();
                enqueueSnackbar(`Удалено соглашение №${props.id}`, {
                  variant: "warning",
                  autoHideDuration: 1000,
                });
              })
            }
          >
            Удалить
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
