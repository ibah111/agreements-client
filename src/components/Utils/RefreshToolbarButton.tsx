import Button from "@mui/material/Button";
import { Refresh } from "@mui/icons-material";

interface RefreshToolbarButtonProps {
  refresh: VoidFunction;
}

export default function RefreshToolbarButton(props: RefreshToolbarButtonProps) {
  return (
    <Button size="small" startIcon={<Refresh />} onClick={props.refresh}>
      Обновить
    </Button>
  );
}
