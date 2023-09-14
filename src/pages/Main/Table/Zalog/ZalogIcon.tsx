import { CustomEvents, EventDialog, OnOpenDialogProps } from "../Table";
import { CarCrash } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";

interface ZalogProps {
  eventTarget: EventTarget | null;
  refresh: VoidFunction;
  person_id: number;
  agreement_id: number;
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
          new EventDialog<OnOpenDialogProps>(CustomEvents.onOpenZalogDialog, {
            agreementId: props.agreement_id,
            personId: props.person_id,
          })
        );
      }}
    />
  );
}
