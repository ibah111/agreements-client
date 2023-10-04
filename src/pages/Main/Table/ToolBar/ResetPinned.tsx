import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function ResetPinned() {
  return (
    <Button size="small" startIcon={<RestartAltIcon />} onClick={() => {}}>
      Сброс закрепа
    </Button>
  );
}
