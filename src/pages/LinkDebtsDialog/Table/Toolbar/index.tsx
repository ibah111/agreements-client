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
import ContactLogButton from "./ContactLog/ContactLogButton";

interface ToolbarProps {
  refresh: VoidFunction;
  setOpen: VoidFunction;
  setOpenLog: VoidFunction;
  id_agreement: number;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={props.refresh} />
      <Can I={Action.Create} a={Subject.AgreementToDebt}>
        <AddDebtLinkButton setOpen={props.setOpen} />
        <ContactLogButton
          setOpen={props.setOpenLog}
          id_agreement={props.id_agreement}
        />
      </Can>
    </GridToolbarContainer>
  );
}
