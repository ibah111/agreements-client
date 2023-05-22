import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../components/Utils/RefreshToolbarButton";
import { AuthUserSuccess } from "../../../../Schemas/Auth";

import AddAgreement from "./AddAgreement";
import DeleteRowButton from "./DeleteRowButton";

interface AgreementTableToolbarProps {
  refresh: VoidFunction;
  handleOpen: VoidFunction;
  logedRole: AuthUserSuccess;
}

export default function AgreementTableToolbar(
  props: AgreementTableToolbarProps
) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <RefreshToolbarButton refresh={props.refresh} />
      <AddAgreement handleOpen={props.handleOpen} />
      <DeleteRowButton refresh={props.refresh} />
    </GridToolbarContainer>
  );
}
