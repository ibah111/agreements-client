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
      {/* <SyncAllButton refresh={props.refresh} /> */}
      <AddAgreement handleOpen={props.handleOpen} />
      <DeleteRowButton refresh={props.refresh} />
      <CheckboxRowHeight onClick={props.refreshHeight} />
    </GridToolbarContainer>
  );
}
