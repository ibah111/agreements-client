import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddAgreementProps {
  handleOpen: VoidFunction;
}

export default function AddAgreement(props: AddAgreementProps) {
  return (
    <Button startIcon={<Add />} size="small" onClick={props.handleOpen}>
      Создать соглашение
    </Button>
  );
}
