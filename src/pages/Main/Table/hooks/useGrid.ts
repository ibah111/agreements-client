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

interface GridResult<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  pinnedColumns: GridPinnedColumns;
  handlePinnedColumnsChange: (model: GridPinnedColumns) => void;
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
  const [pinnedColumns, handlePinnedColumnsChange] =
    React.useState<GridPinnedColumns>({
      left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        "id",
        "statusAgreement",
        "FIO",
        "conclusion_date",
        "payableStatus",
      ],
      right: ["finish_date", "Card_IP", "actions"],
    });
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
    }).subscribe((res) => {
      if (res) {
        setRowCount(res.count);
        setRows(res.rows);
      }
    });
    sub.add(() => {
      setLoading(false);
    });
    return sub.unsubscribe.bind(sub);
  }, [filterModel, paginationModel]);
  const ability = useAbility(CaslContext);
  const portfolios = useAsyncMemo(getPortfolio, [], []);
  const collectors = useAsyncMemo(getAllCollectors, [], []);
  const columns = React.useMemo(
    () =>
      GetColumns(
        refresh,
        ability,
        agreementType,
        purposes,
        regDoc!,
        status,
        portfolios,
        collectors,
        DialogTarget,
        pinnedColumns
      ),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      ability,
      agreementType,
      purposes,
      regDoc,
      status,
      collectors,
      portfolios,
      DialogTarget,
      pinnedColumns,
    ]
  );

  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return {
    rows,
    handlePinnedColumnsChange,
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
