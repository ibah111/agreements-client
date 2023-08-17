import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import SwitchTheme from "../../../../../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import RefreshToolbarButton from "../../../../../../components/Utils/RefreshToolbarButton";
interface ScheduleToolbarProps {
  refresh: VoidFunction;
}
export default function ScheduleToolbar(props: ScheduleToolbarProps) {
  return (
    <GridToolbarContainer>
      <SwitchTheme />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
    </GridToolbarContainer>
  );
}
