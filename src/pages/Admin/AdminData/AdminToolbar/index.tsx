import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";
import AddUserButton from "./addUserButton";
import { Can } from "../../../../casl/casl";
import { Action, Subject } from "../../../../casl/casl.factory";
interface ScheduleToolbarProps {
  refresh: VoidFunction;
}
export default function AdminToolbar(props: ScheduleToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
      <Can I={Action.Create} a={Subject.Admin}>
        <AddUserButton refresh={props.refresh} />
      </Can>
    </GridToolbarContainer>
  );
}
