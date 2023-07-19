import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
interface AddCommentButtonProps {
  setOpen: VoidFunction;
}
export default function AddCommentButton(props: AddCommentButtonProps) {
  return (
    <Button startIcon={<Add />} size="small" onClick={props.setOpen}>
      Добавить комментарий
    </Button>
  );
}
