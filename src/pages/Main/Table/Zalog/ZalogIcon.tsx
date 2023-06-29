import { Button } from "@mui/material";
import { CustomEvents, EventDialog } from "../Table";
import { CarCrash } from "@mui/icons-material";

interface IpProps {
  refresh: VoidFunction;
  agreementId: number;
  eventTarget: EventTarget | null;
}

export default function ZalogIcon(props: IpProps) {
  return (
    <Button
      startIcon={<CarCrash />}
      color={"inherit"}
      onClick={() => {
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenZalogDialog, props.agreementId)
        );
      }}
    >
      ЗАЛОГ
    </Button>
  );
}
