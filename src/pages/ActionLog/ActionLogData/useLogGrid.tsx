import React from "react";
import getLogs from "../../../api/TableApi's/getLogs";
import { ActionLogModel } from "../../../Models/RouterGridModels/ActionLog";
import {
  GridValidRowModel,
  GridColDef,
  GridPaginationModel,
  GridCallbackDetails,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid-premium";
import columnsActionLog from "./column.actionLog";
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
export default function useLogGrid(): GridResult<ActionLogModel> {
  const [rows, setRows] = React.useState<ActionLogModel[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });
  const refresh = React.useCallback(() => {
    setLoading(true);
    const s = getLogs({
      paginationModel,
      filterModel,
      sortModel,
    }).subscribe((res) => {
      if (res) {
        setRowCount(res.count);
        setRows(res.rows);
      }
    });
    s.add(setLoading(false));
  }, [filterModel, paginationModel, sortModel]);

  const columns = React.useMemo<GridColDef<ActionLogModel>[]>(
    () => columnsActionLog(),
    []
  );

  React.useEffect(() => {
    refresh();
  }, [refresh]);
  return {
    rows,
    loading,
    columns,
    rowCount,
    refresh,
    paginationModel,
    onPaginationModelChange,
    sortModel,
    onSortModelChange,
    filterModel,
    onFilterModelChange,
  };
}
