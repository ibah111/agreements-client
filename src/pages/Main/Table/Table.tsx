import { darken, Grid, lighten, Typography } from "@mui/material";
import {
  DataGridPremium,
  GridPinnedColumns,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-premium";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { lastValueFrom } from "rxjs";
import editAgremeent from "../../../api/editAgreement";
import getPurposes from "../../../api/getPurpose";
import getRegDoc from "../../../api/getRegDocType";
import getStatusAgreement from "../../../api/getStatusAgreement";
import LinkDebtsDialog from "../../../components/LinkDebtsDialog.ts";
import useLinkDebtsControl from "../../../components/LinkDebtsDialog.ts/useLinkDebtsControl";
import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";
import useAsyncMemo from "../../../utils/asyncMemo";
import SearchDialog from "../SearchDialog";
import { useGrid } from "./hooks/useGrid";
import AgreementTableToolbar from "./ToolBar/Toolbar";
export class EventDialog extends Event {
  constructor(type: string, value: string | number | object) {
    super(type);
    this.value = value;
  }
  value: number | string | object;
}
export default function AgreementTable() {
  const purposes = useAsyncMemo(getPurposes, []);
  const regDoc = useAsyncMemo(getRegDoc, []);
  const status = useAsyncMemo(getStatusAgreement, []);
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { refresh, ...gridProps } = useGrid(
    purposes!,
    regDoc!,
    status!,
    DialogTarget
  );
  const linkDialogControl = useLinkDebtsControl({
    DialogTarget,
    onClose: () => {
      refresh();
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    refresh();
    setOpen(false);
  }, [refresh]);

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
          {...gridProps}
          keepNonExistentRowsSelected
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: AgreementTableToolbar }}
          slotProps={{
            toolbar: { refresh, handleOpen },
          }}
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
          hideFooterSelectedRowCount
          disableAggregation // убрал ненужные функции
          disableRowGrouping // убрал ненужные функции
          // пагинация = https://mui.com/x/react-data-grid/row-selection/#usage-with-server-side-pagination
          pagination
          filterMode="server"
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
