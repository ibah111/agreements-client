import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import useAdminGrid from "./useAdminGrid";
import columnsAdmin from "./column.Admin";
import AdminToolbar from "./AdminToolbar";
import { Grid } from "@mui/material";
import React from "react";
import useAddRoleDialog from "./AdminActions/useAddRoleDialog";
import { AddRoleDialog } from "./AdminActions/AddRoleDialog";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

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
}

export default function AdminTable() {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { rows, refresh } = useAdminGrid(DialogTarget);
  const cols = columnsAdmin({
    refresh: refresh,
    eventTarget: DialogTarget,
  });
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
      refresh();
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
          pagination
          slots={{ toolbar: AdminToolbar, pagination: CustomPagination }}
          slotProps={{
            toolbar: { refresh },
          }}
        />
      </Grid>
      {addRoleControl.open && (
        <AddRoleDialog
          open={addRoleControl.open}
          refresh={addRoleControl.closeAddRoleDialog}
          id_user={addRoleControl.userId}
        />
      )}
    </>
  );
}
