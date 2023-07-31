import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import React from "react";
import useZalogTable from "./hooks/useZalogTable";
import ZalogToolbar from "./toolbar/ZalogToolbar";
import AddZalogDialog from "./toolbar/AddZalogDialog";
interface ZalogProps {
  id_agreement: number;
  id_person: number;
}

export default function ZalogDataGrid(props: ZalogProps) {
  const { columns, rows } = useZalogTable(props.id_agreement);
  const [open, setOpen] = React.useState(false);
  const handleOpenZalogLinks = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    right: ["Delete"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
  return (
    <>
      <DataGridPremium
        pinnedColumns={pinnedColumns}
        onPinnedColumnsChange={handlePinnedColumnsChange}
        columns={columns}
        rows={rows}
        hideFooter
        slots={{
          toolbar: ZalogToolbar,
        }}
        slotProps={{
          toolbar: {
            handleOpen: handleOpenZalogLinks,
          },
        }}
      />
      {open && (
        <AddZalogDialog
          open={open}
          onClose={handleClose}
          id_agreement={props.id_agreement}
          id_person={props.id_person}
        />
      )}
    </>
  );
}
