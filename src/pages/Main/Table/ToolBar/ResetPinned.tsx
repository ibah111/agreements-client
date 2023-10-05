import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React from "react";
import {
  useGridApiContext,
  useGridSelector,
  gridPinnedColumnsSelector,
} from "@mui/x-data-grid-premium";
import { initialPinned } from "../hooks/useGrid";

export default function ResetPinned() {
  const api = useGridApiContext();
  const pinnedColumns = useGridSelector(api, gridPinnedColumnsSelector);
  const click = React.useCallback(() => {
    if (Object.keys(pinnedColumns).length === 0) {
      api.current.setPinnedColumns(initialPinned);
    } else {
      api.current.setPinnedColumns({});
    }
  }, [api, pinnedColumns]);
  return (
    <Button size="small" startIcon={<RestartAltIcon />} onClick={click}>
      Сброс закрепа
    </Button>
  );
}
