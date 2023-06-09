import { Button } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { CustomEvents, EventDialog } from "../Table";

interface IpProps {
  refresh: VoidFunction;
  agreementId: number;
  eventTarget: EventTarget | null;
}

export default function IpIcon(props: IpProps) {
  return (
    <Button
      startIcon={<InsertChartIcon />}
      color={"inherit"}
      onClick={() => {
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenCardDialog, props.agreementId)
        );
      }}
    >
      ип
    </Button>
  );
}
