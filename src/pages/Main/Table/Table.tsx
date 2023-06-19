import { Grid, Typography } from "@mui/material";
import {
  DataGridPremium,
  GridPinnedColumns,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-premium";
import { enqueueSnackbar } from "notistack";
import React from "react";
import getAgreementType from "../../../api/getAgreementType";
import getPurposes from "../../../api/getPurpose";
import getRegDoc from "../../../api/getRegDocType";
import getStatusAgreement from "../../../api/getStatusAgreement";
import LinkDebtsDialog from "../../../components/LinkDebtsDialog.ts";
import useLinkDebtsControl from "../../../components/LinkDebtsDialog.ts/useLinkDebtsControl";
import useAsyncMemo from "../../../utils/asyncMemo";
import SearchDialog from "../SearchDialog";
import CardIpDialog from "./CardIpDialog";
import useCardControls from "./CardIpDialog/hooks/useCardControls";
import { useGrid } from "./hooks/useGrid";
import useRowUpdater from "./RowUpdater";
import { Root } from "./Style/style";
import AgreementTableToolbar from "./ToolBar/Toolbar";
export class EventDialog extends Event {
  constructor(type: CustomEvents, value: string | number | object) {
    super(type);
    this.value = value;
  }
  value: number | string | object;
}
export enum CustomEvents {
  onOpenCardDialog = "onOpenCardDialog",
  onOpenDialog = "onOpenDialog",
}

export default function AgreementTable() {
  const purposes = useAsyncMemo(getPurposes, []);
  const regDoc = useAsyncMemo(getRegDoc, []);
  const status = useAsyncMemo(getStatusAgreement, []);
  const agreementType = useAsyncMemo(getAgreementType, []);
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { refresh, ...gridProps } = useGrid(
    purposes!,
    regDoc!,
    status!,
    agreementType!,
    DialogTarget
  );
  const linkDialogControl = useLinkDebtsControl({
    DialogTarget,
    onClose: () => {
      refresh();
    },
  });
  const cardIpControl = useCardControls({
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
      "conclusion_date",
      "finish_date",
      "debt_id",
      "r_law_act_id",
    ],
    right: ["Card_IP", "actions"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );
  const { processRowUpdate, RenderDialog } = useRowUpdater(refresh);
  return (
    <Grid item container xs direction={"column"}>
      <Grid item sx={{ margin: "3px" }}>
        <Typography variant="h5">Таблица соглашений</Typography>
      </Grid>
      {RenderDialog}
      <Root
        item
        xs
        sx={{
          height: 400,
          width: "100%",
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
          onProcessRowUpdateError={(e) => {
            enqueueSnackbar(`Возникла ошибка ${e}`, { variant: "error" });
          }}
          processRowUpdate={processRowUpdate}
          pinnedColumns={pinnedColumns}
          onPinnedColumnsChange={handlePinnedColumnsChange}
          hideFooterSelectedRowCount
          disableAggregation // убрал ненужные функции
          disableRowGrouping // убрал ненужные функции
          filterMode="server"
          pagination
          disableMultipleColumnsSorting
          paginationMode="server"
          getRowClassName={(params) =>
            `super-app-theme--${params.row.statusAgreement}`
          }
        />
      </Root>
      {open && <SearchDialog open={open} onClose={handleClose} />}
      {linkDialogControl.open && (
        <LinkDebtsDialog
          open={linkDialogControl.open}
          onClose={linkDialogControl.closeDialog}
          agreementId={linkDialogControl.personId}
          debtId={0}
        />
      )}
      {cardIpControl.openCard && (
        <CardIpDialog
          open={cardIpControl.openCard}
          onClose={cardIpControl.handleCloseCard}
          agreementId={cardIpControl.agreementIdCard}
        />
      )}
    </Grid>
  );
}
