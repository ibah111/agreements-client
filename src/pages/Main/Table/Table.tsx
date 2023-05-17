import { Grid, Typography } from "@mui/material";
import {
  DataGridPremium,
  GridPinnedColumns,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-premium";
import { plainToInstance } from "class-transformer";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { lastValueFrom } from "rxjs";
import editAgremeent from "../../../api/editAgreement";
import getAgreements from "../../../api/getAgreement";
import getPurposes from "../../../api/getPurpose";
import LinkDebtsDialog from "../../../components/LinkDebtsDialog.ts";
import useLinkDebtsControl from "../../../components/LinkDebtsDialog.ts/useLinkDebtsControl";
import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";
import useAsyncMemo from "../../../utils/asyncMemo";
import SearchDialog from "../SearchDialog";
import getColumns from "./DataTable/column.data";
import AgreementTableToolbar from "./ToolBar/Toolbar";

export default function AgreementTable() {
  const [agreements, setAgreements] = React.useState<AgreementInstance[]>([]);
  const [loading, setLoading] = React.useState(false);
  const refresh = React.useCallback(() => {
    setLoading(true);
    getAgreements().subscribe((res) => {
      const classData = plainToInstance(AgreementInstance, res);
      setAgreements(classData);
      setLoading(false);
    });
  }, []);
  const purposes = useAsyncMemo(getPurposes, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    refresh();
    setOpen(false);
  }, [refresh]);

  const linkDialogControl = useLinkDebtsControl({
    onClose: () => {
      refresh();
    },
  });

  const columns = React.useMemo(
    () => getColumns(refresh, purposes!, linkDialogControl.openDialog),
    [refresh, purposes, linkDialogControl.openDialog]
  );

  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    left: [
      GRID_CHECKBOX_SELECTION_COL_DEF.field,
      "id",
      "personId",
      "FIO",
      "KD",
      "conclusion_date",
      "debt_id",
      "r_law_act_id",
    ],
    right: ["actions"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });
  return (
    <Grid item container xs direction={"column"}>
      <Grid item style={{ margin: "3px" }}>
        <Typography variant="h5">Таблица соглашений</Typography>
      </Grid>
      <Grid item xs style={{ height: 400, width: "100%" }}>
        <DataGridPremium
          keepNonExistentRowsSelected
          checkboxSelection
          disableRowSelectionOnClick
          loading={loading}
          slots={{ toolbar: AgreementTableToolbar }}
          slotProps={{
            toolbar: { refresh, handleOpen },
          }}
          columns={columns}
          rows={agreements}
          rowCount={100}
          processRowUpdate={async (
            oldData: AgreementInstance,
            newData: AgreementInstance
          ) => {
            const data = await lastValueFrom(editAgremeent(oldData, newData));
            enqueueSnackbar("Изменено", { variant: "success" });
            return data;
          }}
          pinnedColumns={pinnedColumns}
          onPinnedColumnsChange={handlePinnedColumnsChange}
          onRowSelectionModelChange={(selectedArray) => {
            selectedArray.sort();
            enqueueSnackbar(`Выбран строка(и): ${selectedArray}`, {
              variant: "info",
              autoHideDuration: 850,
            });
          }}
          hideFooterSelectedRowCount
          disableAggregation // убрал ненужные функции
          disableRowGrouping // убрал ненужные функции
          // пагинация = https://mui.com/x/react-data-grid/row-selection/#usage-with-server-side-pagination
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </Grid>
      {open && <SearchDialog open={open} onClose={handleClose} />}
      {linkDialogControl.open && (
        <LinkDebtsDialog
          open={linkDialogControl.open}
          onClose={linkDialogControl.closeDialog}
          agreementId={linkDialogControl.personId}
        />
      )}
    </Grid>
  );
}
