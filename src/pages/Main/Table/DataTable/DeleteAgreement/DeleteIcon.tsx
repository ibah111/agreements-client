import { Tooltip } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import { CustomEvents, EventDialog } from "../../Table";
interface DeleteProps {
  refresh: VoidFunction;
  agreementId: number;
  eventTarget: EventTarget | null;
}
export default function DeleteIcon(props: DeleteProps) {
  return (
    <>
      <Tooltip title={"Удалить соглашение"}>
        <GridActionsCellItem
          label="Delete"
          icon={<DeleteForeverIcon />}
          size="small"
          color="inherit"
          onClick={() => {
            props.eventTarget?.dispatchEvent(
              new EventDialog(
                CustomEvents.onOpenDeleteDialog,
                props.agreementId
              )
            );
          }}
        />
      </Tooltip>
    </>
  );
}
