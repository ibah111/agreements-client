import { Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteSelectedAgreements from "../../../../api/deleteSelectedAgreement";
import { useGridApiContext, useGridSelector } from "@mui/x-data-grid-premium";
import { GridStatePremium } from "@mui/x-data-grid-premium/models/gridStatePremium";
import callMessage from "../../../../utils/callMessage";
import { Action, Subject } from "../../../../casl/casl.factory";
import { Can } from "../../../../casl/casl";
interface DeleteRowButtonProps {
  refresh: VoidFunction;
}
export default function DeleteRowButton(props: DeleteRowButtonProps) {
  const api = useGridApiContext();
  const rows = useGridSelector(
    api,
    (state: GridStatePremium) => state.rowSelection as number[]
  );
  const handleClick = () => {
    if (!rows) {
      return callMessage("Строки не выбраны", { variant: "info" });
    } else {
      deleteSelectedAgreements(rows).subscribe(() => {
        rows.sort();
        callMessage(`Удалены строки ${rows}`, { variant: "info" });
        props.refresh();
      });
    }
  };
  return (
    <Can I={Action.Delete} a={Subject.Agreement}>
      <Button
        startIcon={<DeleteIcon />}
        size="small"
        onClick={handleClick}
        variant="contained"
        color="error"
      >
        Удалить строки
      </Button>
    </Can>
  );
}
