import { useAbility } from "@casl/react";
import { Portfolio } from "@contact/models";
import {
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid-premium";
import { get, transformAxios } from "@tools/rxjs-pipes";
import React from "react";
import { of } from "rxjs";
import getAgreements from "../../../../api/getAgreements";
import { CaslContext } from "../../../../casl/casl";
import { IdTitle } from "../../../../Models/IdTitle";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import useAsyncMemo from "../../../../utils/asyncMemo";
import { baseRequest } from "../../../../utils/baseRequest";
import GetColumns from "../DataTable/column.data";
import getAllCollectors from "../../../../api/getAllCollectors";

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
export function useGrid(
  purposes: IdTitle[],
  regDoc: IdTitle[],
  status: IdTitle[],
  agreementType: IdTitle[],
  DialogTarget: EventTarget
): GridResult<AgreementInstance> {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<AgreementInstance[]>([]);
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
  const portfolios = useAsyncMemo(
    () =>
      of("/Agreements/portfolio").pipe(
        get<Portfolio[]>(baseRequest),
        transformAxios()
      ),
    []
  );
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
        portfolios || [],
        collectors,
        DialogTarget
      ),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ability, agreementType, purposes, regDoc, status, portfolios, DialogTarget]
  );
  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return {
    rows,
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
