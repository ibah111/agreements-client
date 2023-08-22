import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";
interface ScheduleToolbarProps {
  refresh: VoidFunction;
}
export default function LogToolbar(props: ScheduleToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
    </GridToolbarContainer>
  );
}
