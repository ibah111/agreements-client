import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";

import AddAgreement from "./AddAgreement";
import CheckboxRowHeight from "./CheckboxRowHeight";
import DeleteRowButton from "./DeleteRowButton";
import SwitchTheme from "../../../../components/ThemeProvider/SwitchTheme/SwitchTheme";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SyncAllButton from "./SyncAllButton";
import { Can } from "../../../../casl/casl";
import { Action, Subject } from "../../../../casl/casl.factory";

interface AgreementTableToolbarProps {
  refresh: VoidFunction;
  handleOpen: VoidFunction;
  refreshHeight: () => void;
}

export default function AgreementTableToolbar(
  props: AgreementTableToolbarProps
) {
  return (
    <GridToolbarContainer>
      <SwitchTheme />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
      <Can I={Action.Update} a={Subject.Admin}>
        <SyncAllButton refresh={props.refresh} />
      </Can>
      <AddAgreement handleOpen={props.handleOpen} />
      <DeleteRowButton refresh={props.refresh} />
      <CheckboxRowHeight onClick={props.refreshHeight} />
    </GridToolbarContainer>
  );
}
