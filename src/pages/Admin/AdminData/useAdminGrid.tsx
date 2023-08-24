import React from "react";
import getAdminUserRole, {
  User,
} from "../../../api/TableApi's/Admin/getAdminDetails";
import {
  GridValidRowModel,
  GridColDef,
  GridPaginationModel,
  GridCallbackDetails,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid-premium";
import columnsAdmin from "./column.Admin";
interface GridResult<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  rows: T[];
  onPaginationModelChange: (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => void;
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  onFilterModelChange: (
    model: GridFilterModel,
    details: GridCallbackDetails<"filter">
  ) => void;
  onSortModelChange: (
    model: GridSortModel,
    details: GridCallbackDetails<any>
  ) => void;
  refresh: () => void;
  loading: boolean;
  rowCount: number;
}
export default function useAdminGrid(
  DialogTarget: EventTarget
): GridResult<User> {
  const [loading, setLoading] = React.useState(false);
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });
  const [rows, setRows] = React.useState<User[]>([]);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const s = getAdminUserRole({
      paginationModel,
      filterModel,
      sortModel,
    }).subscribe((res) => {
      if (res) {
        setRows(res.rows);
        setRowCount(res.count);
      }
    });
    s.add(setLoading(false));
  }, [filterModel, paginationModel, sortModel]);

  const columns = React.useMemo<GridColDef<User>[]>(
    () =>
      columnsAdmin({
        refresh: refresh,
        eventTarget: DialogTarget,
      }),
    [DialogTarget, refresh]
  );

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    rows,
    refresh,
    loading,
    columns,
    filterModel,
    onFilterModelChange,
    onPaginationModelChange,
    onSortModelChange,
    paginationModel,
    rowCount,
    sortModel,
  };
}
