import { darken, Grid, lighten, Typography } from "@mui/material";
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
import getRegDoc from "../../../api/getRegDocType";
import getStatusAgreement from "../../../api/getStatusAgreement";
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
  const regDoc = useAsyncMemo(getRegDoc, []);
  const status = useAsyncMemo(getStatusAgreement, []);
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
    () =>
      getColumns(
        refresh,
        purposes!,
        regDoc!,
        status!,
        linkDialogControl.openDialog
      ),
    [refresh, purposes, status, regDoc, linkDialogControl.openDialog]
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
  const getBackgroundColor = (color: string, mode: string) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color: string, mode: string) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getSelectedBackgroundColor = (color: string, mode: string) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
    mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);
  return (
    <Grid item container xs direction={"column"}>
      <Grid item style={{ margin: "3px" }}>
        <Typography variant="h5">Таблица соглашений</Typography>
      </Grid>
      <Grid
        item
        xs
        style={{
          height: 400,
          width: "100%",
        }}
        sx={{
          "& .super-app-theme--1": {
            backgroundColor: (theme) =>
              getBackgroundColor(theme.palette.info.main, theme.palette.mode),
            "&:hover": {
              backgroundColor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.info.main,
                  theme.palette.mode
                ),
            },
            "&.Mui-selected": {
              backgroundColor: (theme) =>
                getSelectedBackgroundColor(
                  theme.palette.info.main,
                  theme.palette.mode
                ),
              "&:hover": {
                backgroundColor: (theme) =>
                  getSelectedHoverBackgroundColor(
                    theme.palette.info.main,
                    theme.palette.mode
                  ),
              },
            },
          },
          "& .super-app-theme--2": {
            backgroundColor: (theme) =>
              getBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
            "&:hover": {
              backgroundColor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                ),
            },
            "&.Mui-selected": {
              backgroundColor: (theme) =>
                getSelectedBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                ),
              "&:hover": {
                backgroundColor: (theme) =>
                  getSelectedHoverBackgroundColor(
                    theme.palette.success.main,
                    theme.palette.mode
                  ),
              },
            },
          },
          "& .super-app-theme--3": {
            backgroundColor: (theme) =>
              getBackgroundColor(theme.palette.error.main, theme.palette.mode),
            "&:hover": {
              backgroundColor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.error.main,
                  theme.palette.mode
                ),
            },
            "&.Mui-selected": {
              backgroundColor: (theme) =>
                getSelectedBackgroundColor(
                  theme.palette.error.main,
                  theme.palette.mode
                ),
              "&:hover": {
                backgroundColor: (theme) =>
                  getSelectedHoverBackgroundColor(
                    theme.palette.error.main,
                    theme.palette.mode
                  ),
              },
            },
          },
          "& .super-app-theme--4": {
            backgroundColor: (theme) =>
              getBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode
              ),
            "&:hover": {
              backgroundColor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.warning.main,
                  theme.palette.mode
                ),
            },
            "&.Mui-selected": {
              backgroundColor: (theme) =>
                getSelectedBackgroundColor(
                  theme.palette.warning.main,
                  theme.palette.mode
                ),
              "&:hover": {
                backgroundColor: (theme) =>
                  getSelectedHoverBackgroundColor(
                    theme.palette.warning.main,
                    theme.palette.mode
                  ),
              },
            },
          },
        }}
      >
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
              variant: "success",
              autoHideDuration: 850,
            });
          }}
          hideFooterSelectedRowCount
          disableAggregation // убрал ненужные функции
          disableRowGrouping // убрал ненужные функции
          // пагинация = https://mui.com/x/react-data-grid/row-selection/#usage-with-server-side-pagination
          pagination
          paginationModel={paginationModel}
          filterMode="server"
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          getRowClassName={(params) =>
            `super-app-theme--${params.row.statusAgreement}`
          }
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
