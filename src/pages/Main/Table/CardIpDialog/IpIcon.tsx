import InsertChartIcon from "@mui/icons-material/InsertChart";
import { CustomEvents, EventDialog } from "../Table";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";

interface IpProps {
  refresh: VoidFunction;
  agreementId: number;
  eventTarget: EventTarget | null;
}

export default function IpIcon(props: IpProps) {
  return (
    <GridActionsCellItem
      size="small"
      label="ИП"
      icon={<InsertChartIcon />}
      color={"inherit"}
      onClick={() => {
        props.eventTarget?.dispatchEvent(
          new EventDialog(CustomEvents.onOpenCardDialog, props.agreementId)
        );
      }}
    />
  );
}
