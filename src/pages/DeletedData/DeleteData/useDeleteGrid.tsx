import React from "react";
import getDeleted from "../../../api/TableApi's/getDeleted";
import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";
import {
  GridValidRowModel,
  GridColDef,
  GridPaginationModel,
  GridCallbackDetails,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid-premium";
import columnDeleteData from "./column.Delete";
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
export default function useDeleteGrid(): GridResult<AgreementInstance> {
  const [loading, setLoading] = React.useState(false);
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });
  const [rows, setRows] = React.useState<AgreementInstance[]>([]);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const s = getDeleted({
      filterModel,
      paginationModel,
      sortModel,
    }).subscribe((res) => {
      if (res) {
        setRows(res.rows);
        setRowCount(res?.count);
      }
    });
    s.add(setLoading(false));
  }, [filterModel, paginationModel, sortModel]);

  const columns = React.useMemo<GridColDef<AgreementInstance>[]>(
    () =>
      columnDeleteData({
        onClose: refresh,
      }),
    [refresh]
  );

  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return {
    rows,
    refresh,
    loading,
    onPaginationModelChange,
    onSortModelChange,
    onFilterModelChange,
    rowCount,
    columns,
    filterModel,
    paginationModel,
    sortModel,
  };
}
