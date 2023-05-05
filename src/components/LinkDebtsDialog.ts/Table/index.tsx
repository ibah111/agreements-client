import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import LinkDialog from "../LinkDialog";
import Toolbar from "./Toolbar";
import useTable from "./useTable";

interface TableProps {
  agreementId: number;
}

export default function Table(props: TableProps) {
  const { loading, rows, columns, refresh } = useTable(props.agreementId);
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    refresh();
  }, [refresh]);
  return (
    <>
      <DataGridPremium
        hideFooter
        slotProps={{ toolbar: { refresh, setOpen: handleOpen } }}
        slots={{ toolbar: Toolbar }}
        rows={rows}
        columns={columns}
        loading={loading}
      />
      {open && (
        <LinkDialog
          agreementId={props.agreementId}
          onClose={handleClose}
          open={open}
        />
      )}
    </>
  );
}
