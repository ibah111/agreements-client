import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";
import { AuthUserSuccess } from "../../../../Schemas/Auth";

import AddAgreement from "./AddAgreement";
import CheckboxRowHeight from "./CheckboxRowHeight";
import DeleteRowButton from "./DeleteRowButton";

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
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
      <AddAgreement handleOpen={props.handleOpen} />
      <DeleteRowButton refresh={props.refresh} />
      <CheckboxRowHeight onClick={props.refreshHeight} />
      {/*TODO <AdminPanel /> */}
    </GridToolbarContainer>
  );
}
