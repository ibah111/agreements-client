import { CustomEvents, EventDialog } from "../Table";
import { CarCrash } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";

interface ZalogProps {
  refresh: VoidFunction;
  person_id: number;
  eventTarget: EventTarget | null;
}

export default function ZalogIcon(props: ZalogProps) {
  return (
    <GridActionsCellItem
      size="small"
      icon={<CarCrash />}
      label="Залог"
      color={"inherit"}
      onClick={() => {
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenZalogDialog, props.person_id)
        );
      }}
    />
  );
}
