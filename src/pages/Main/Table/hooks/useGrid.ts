import { useAbility } from "@casl/react";
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridPinnedColumns,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid-premium";
import React from "react";
import getAgreements from "../../../../api/getAgreements";
import { CaslContext } from "../../../../casl/casl";
import { IdTitle } from "../../../../Models/IdTitle";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import useAsyncMemo from "../../../../utils/asyncMemo";
import GetColumns from "../DataTable/column.data";
import getAllCollectors from "../../../../api/getAllCollectors";
import getPortfolio from "../../../../api/getPortfolio";
export const initialPinned = {
  left: [
    GRID_CHECKBOX_SELECTION_COL_DEF.field,
    "id",
    "statusAgreement",
    "person_id",
    "FIO",
    "birth_date",
    "conclusion_date",
    "portfolio",
    "payable_status",
  ],
  right: ["debt_count", "finish_date", "Card_IP", "actions"],
};
interface GridResult<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  pinnedColumns: GridPinnedColumns;
  onPinnedColumnsChange: (model: GridPinnedColumns) => void;
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
export function useGrid(
  purposes: IdTitle[],
  regDoc: IdTitle[],
  status: IdTitle[],
  agreementType: IdTitle[],
  DialogTarget: EventTarget
): GridResult<AgreementInstance> {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<AgreementInstance[]>([]);
  const [pinnedColumns, onPinnedColumnsChange] =
    React.useState<GridPinnedColumns>(initialPinned);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const refresh = React.useCallback(() => {
    setLoading(true);
    const sub = getAgreements({
      paginationModel,
      filterModel,
      sortModel,
    }).subscribe({
      next: (res) => {
        if (res) {
          setRowCount(res.count);
          setRows(res.rows);
        }
      },
      error: () => {
        setLoading(false);
      },
      complete: () => {
        setLoading(false);
      },
    });
    return sub.unsubscribe.bind(sub);
  }, [filterModel, paginationModel, sortModel]);
  const ability = useAbility(CaslContext);
  const portfolios = useAsyncMemo(getPortfolio, [], []);
  const collectors = useAsyncMemo(getAllCollectors, [], []);
  const columns = React.useMemo<GridColDef<AgreementInstance>[]>(
    () =>
      GetColumns(
        refresh,
        ability,
        agreementType,
        regDoc!,
        status,
        portfolios,
        collectors,
        DialogTarget,
        pinnedColumns
      ),
    [
      refresh,
      ability,
      agreementType,
      regDoc,
      status,
      portfolios,
      collectors,
      DialogTarget,
      pinnedColumns,
    ]
  );

  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return {
    rows,
    onPinnedColumnsChange,
    pinnedColumns,
    columns,
    refresh,
    loading,
    filterModel,
    onFilterModelChange,
    sortModel,
    onSortModelChange,
    onPaginationModelChange,
    paginationModel,
    rowCount,
  };
}
