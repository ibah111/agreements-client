import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid-premium";

interface TB {
  id_agreement: number;
  setOpenSelect: VoidFunction;
}

export function ScheduleLinkToolbar(props: TB) {
  return (
    <GridToolbarContainer>
      <Button
        size="small"
        onClick={() => {
          props.setOpenSelect();
        }}
      >
        Создать график
      </Button>
    </GridToolbarContainer>
  );
}
