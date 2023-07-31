import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Can } from "../../../../../casl/casl";
import { Action, Subject } from "../../../../../casl/casl.factory";

interface AddAgreementProps {
  handleOpen: VoidFunction;
}

export default function AddAgreement(props: AddAgreementProps) {
  return (
    <Can I={Action.Create} a={Subject.Agreement}>
      <Button
        startIcon={<Add />}
        size="small"
        variant="outlined"
        onClick={props.handleOpen}
        color="primary"
      >
        Добавить залог
      </Button>
    </Can>
  );
}
