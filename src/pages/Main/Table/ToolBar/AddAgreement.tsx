import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddAgreementProps {
  handleOpen: VoidFunction;
}

export default function AddAgreement(props: AddAgreementProps) {
  return (
    <Button
      startIcon={<Add />}
      size="small"
      variant="contained"
      onClick={props.handleOpen}
      color="primary"
    >
      Создать соглашение
    </Button>
  );
}
