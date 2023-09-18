import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import PaidIcon from "@mui/icons-material/Paid";
import { CustomEvents, EventDialog } from "../Table";

interface ScheduleProps {
  eventTarget: EventTarget | null;
  refresh: VoidFunction;
  id_agreement: number;
  person_id: number;
}

export default function ScheduleIcon(props: ScheduleProps) {
  return (
    <GridActionsCellItem
      size="small"
      label="График платежей"
      icon={<PaidIcon />}
      color="inherit"
      onClick={() => {
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenScheduleDialog, {
            agreementId: props.id_agreement,
            personId: props.person_id,
          })
        );
      }}
    />
  );
}
