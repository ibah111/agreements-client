import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import deleteAgreement from "../../../../../api/deleteAgreement";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface DeleteDialogProps {
  agreementId: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        {`Вы уверены, что хотите удалить соглашение № ${props.agreementId}`}
      </DialogTitle>
      <DialogContent>
        <Button
          fullWidth
          startIcon={<DeleteForeverIcon />}
          variant="contained"
          color="error"
          onClick={() =>
            deleteAgreement(props.agreementId).subscribe(
              () => (
                enqueueSnackbar(`Удалено соглашение №${props.agreementId}`, {
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
