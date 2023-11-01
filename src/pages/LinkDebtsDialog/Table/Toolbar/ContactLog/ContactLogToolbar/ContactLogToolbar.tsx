import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-premium";
import HeightButton from "./HeightButton";
interface ToolbarProps {
  changeRowHeight: () => void;
}
export default function ContactLogToolbar(props: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <HeightButton changeRowHeight={props.changeRowHeight} />
    </GridToolbarContainer>
  );
}
