import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import AddDebtLinkButton from "./AddDebtLinkButton";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";
import { Action, Subject } from "../../../../casl/casl.factory";
import { Can } from "../../../../casl/casl";

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
      <Can I={Action.Create} a={Subject.Preview}>
        <AddDebtLinkButton setOpen={props.setOpen} />
      </Can>
    </GridToolbarContainer>
  );
}
