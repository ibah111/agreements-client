import { Button } from "@mui/material";
import { CustomEvents, EventDialog } from "../Table";
import { CarCrash } from "@mui/icons-material";

interface ZalogProps {
  refresh: VoidFunction;
  person_id: number;
  eventTarget: EventTarget | null;
}

export default function ZalogIcon(props: ZalogProps) {
  return (
    <Button
      startIcon={<CarCrash />}
      color={"inherit"}
      onClick={() => {
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenZalogDialog, props.person_id)
        );
      }}
    >
      ЗАЛОГ
    </Button>
  );
}
