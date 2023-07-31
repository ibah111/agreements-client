import { GridToolbarContainer } from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../../components/Utils/RefreshToolbarButton";
import AddZalog from "./AddZalog";

interface ZalogToolbarProps {
  refresh: VoidFunction;
  handleOpen: VoidFunction;
}
export default function ZalogToolbar(props: ZalogToolbarProps) {
  return (
    <GridToolbarContainer>
      <RefreshToolbarButton refresh={props.refresh} />
      <AddZalog handleOpen={props.handleOpen} />
    </GridToolbarContainer>
  );
}
