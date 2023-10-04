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
import SyncAllButton from "./SyncAllButton";
import { Can } from "../../../../casl/casl";
import { Action, Subject } from "../../../../casl/casl.factory";
import DownloadFilterButton from "./DownloadFilterButton";
import ResetPinned from "./ResetPinned";

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
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <DownloadFilterButton />
      <ResetPinned />
      <RefreshToolbarButton refresh={props.refresh} />
      <Can I={Action.Update} a={Subject.Admin}>
        <SyncAllButton refresh={props.refresh} />
      </Can>
      <Can I={Action.Create} a={Subject.Agreement}>
        <AddAgreement handleOpen={props.handleOpen} />
      </Can>
      <Can I={Action.Delete} a={Subject.Agreement}>
        <DeleteRowButton refresh={props.refresh} />
      </Can>
      <CheckboxRowHeight onClick={props.refreshHeight} />
    </GridToolbarContainer>
  );
}
