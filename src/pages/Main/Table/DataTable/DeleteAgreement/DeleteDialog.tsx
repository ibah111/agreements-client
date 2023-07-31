import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import deleteAgreement from "../../../../../api/deleteAgreement";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface DeleteDialogProps {
  id_agreement: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        {`Вы уверены, что хотите удалить соглашение № ${props.id_agreement}`}
      </DialogTitle>
      <DialogContent>
        <Button
          fullWidth
          startIcon={<DeleteForeverIcon />}
          variant="contained"
          color="error"
          onClick={() =>
            deleteAgreement(props.id_agreement).subscribe(
              () => (
                enqueueSnackbar(`Удалено соглашение №${props.id_agreement}`, {
                  variant: "warning",
                  autoHideDuration: 1000,
                  // eslint-disable-next-line no-sequences
                }),
                props.onClose()
              )
            )
          }
        >
          {"Удалить"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
