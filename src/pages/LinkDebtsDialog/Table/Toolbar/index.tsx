import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import AddDebtLinkButton from "./AddDebtLinkButton";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";

interface ToolbarProps {
  refresh: VoidFunction;
  setOpen: VoidFunction;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
      <AddDebtLinkButton setOpen={props.setOpen} />
    </GridToolbarContainer>
  );
}
