import { useAbility } from "@casl/react";
import {
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid-premium";
import { plainToInstance } from "class-transformer";
import React from "react";
import getAgreements from "../../../../api/getAgreements";
import { Purpose } from "../../../../api/getPurpose";
import { RegDoc } from "../../../../api/getRegDocType";
import { StatusAgreement } from "../../../../api/getStatusAgreement";
import { CaslContext } from "../../../../casl/casl";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import getColumns from "../DataTable/column.data";

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
    getAgreements({
      paginationModel,
      filterModel,
    }).subscribe((res) => {
      console.log("Res", res);
      const classData = plainToInstance(AgreementInstance, res.rows);
      setRowCount(res.count);
      setRows(classData);
      setLoading(false);
    });
  }, [filterModel, paginationModel]);
  const ability = useAbility(CaslContext);
  const columns = React.useMemo(
    () => getColumns(refresh, ability, purposes, regDoc!, status, DialogTarget),
    [refresh, ability, purposes, regDoc, status, DialogTarget]
  );
  React.useEffect(() => {
    refresh();
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
