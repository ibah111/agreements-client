import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddDebtLinkButtonProps {
  setOpen: VoidFunction;
}

export default function AddDebtLinkButton(props: AddDebtLinkButtonProps) {
  return (
    <Button
      startIcon={<Add />}
      size="small"
      onClick={props.setOpen}
      variant="outlined"
      color="success"
    >
      Связать долг
    </Button>
  );
}
