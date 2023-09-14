import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid-premium";
import {
  EventScheduleDialog,
  ScheduleLinkDialogEvent,
} from "./ScheduleLinkControl";

interface TB {
  eventTarget: EventTarget;
  id_agreement: number;
  refresh: VoidFunction;
}

function LinkButton(p?: TB) {
  return (
    <Button
      size="small"
      onClick={() => {
        p?.eventTarget?.dispatchEvent(
          new EventScheduleDialog(
            ScheduleLinkDialogEvent.onOpenScheduleDialogCreate,
            p.id_agreement
          )
        );
      }}
    >{`Создать график`}</Button>
  );
}
interface ToolbarProps {
  setOpen: VoidFunction;
  eventTarget: EventTarget;
  id_agreement: number;
}
export function ScheduleLinkToolbar(props: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <LinkButton
        eventTarget={props.eventTarget}
        id_agreement={props.id_agreement}
        refresh={props.setOpen}
      />
    </GridToolbarContainer>
  );
}
