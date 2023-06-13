import { useAbility } from "@casl/react";
import {
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid-premium";
import React from "react";
import getAgreements from "../../../../api/getAgreements";
import { AgreementType } from "../../../../api/getAgreementType";
import { Purpose } from "../../../../api/getPurpose";
import { RegDoc } from "../../../../api/getRegDocType";
import { StatusAgreement } from "../../../../api/getStatusAgreement";
import { CaslContext } from "../../../../casl/casl";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import GetColumns from "../DataTable/column.data";

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
  purposes: Purpose[],
  regDoc: RegDoc[],
  status: StatusAgreement[],
  agreementType: AgreementType[],
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
  const columns = React.useMemo(
    () =>
      GetColumns(
        refresh,
        ability,
        agreementType,
        purposes,
        regDoc!,
        status,
        DialogTarget
      ),
    [refresh, ability, purposes, regDoc, status, agreementType, DialogTarget]
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
