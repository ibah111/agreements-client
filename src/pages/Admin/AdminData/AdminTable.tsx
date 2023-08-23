import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import useAdminGrid from "./useAdminGrid";
import columnsAdmin from "./column.Admin";
import AdminToolbar from "./AdminToolbar";
import { Grid } from "@mui/material";
import React from "react";
import useAddRoleDialog from "./AdminActions/useAddRoleDialog";
import { AddRoleDialog } from "./AdminActions/AddRoleDialog";

export class AdminEventDialog<Value = number | string | object> extends Event {
  constructor(type: AdminEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
/**
 * Таргеты на диалоги
 */
export enum AdminEvents {
  onAddRoleDialog = "onAddUserDialog",
  onDeleteUserDialog = "onDeleteUserDialog",
}

export default function AdminTable() {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { rows, render } = useAdminGrid();
  const cols = columnsAdmin();
  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    left: ["actions"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
  const addRoleControl = useAddRoleDialog({
    DialogTarget,
    refresh: () => {
      render();
    },
  });
  return (
    <>
      <Grid
        item
        xs
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <DataGridPremium
          pinnedColumns={pinnedColumns}
          onPinnedColumnsChange={handlePinnedColumnsChange}
          columns={cols}
          rows={rows}
          slots={{ toolbar: AdminToolbar }}
          slotProps={{
            toolbar: { render },
          }}
        />
      </Grid>
      {addRoleControl.open && <AddRoleDialog />}
      {}
    </>
  );
}
