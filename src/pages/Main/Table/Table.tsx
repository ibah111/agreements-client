import { Grid, useTheme } from "@mui/material";
import {
  DataGridPremium,
  GridPinnedColumns,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-premium";
import React from "react";
import getAgreementType from "../../../api/getAgreementType";
import getPurposes from "../../../api/getPurpose";
import getRegDoc from "../../../api/getRegDocType";
import getStatusAgreement from "../../../api/getStatusAgreement";
import LinkDebtsDialog from "../../../components/LinkDebtsDialog";
import useLinkDebtsControl from "../../../components/LinkDebtsDialog/useLinkDebtsControl";
import useAsyncMemo from "../../../utils/asyncMemo";
import SearchDialog from "../SearchDialog";
import CardIpDialog from "./CardIpDialog";
import useCardControls from "./CardIpDialog/hooks/useCardControls";
import { useGrid } from "./hooks/useGrid";
import useRowUpdater from "./RowUpdater";
import { Root } from "./Style/style";
import useCheck from "./ToolBar/hooks/getRowHeight";
import AgreementTableToolbar from "./ToolBar/Toolbar";
import useZalogControls from "./Zalog/hooks/useZalogControls";
import ZalogDialog from "./Zalog/ZalogIndex";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import { useSnackbar } from "notistack";

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
  onOpenZalogDialog = "onOpenZalogDialog",
}

export default function AgreementTable() {
  const { enqueueSnackbar } = useSnackbar();
  const purposes = useAsyncMemo(getPurposes, [], []);
  const regDoc = useAsyncMemo(getRegDoc, [], []);
  const status = useAsyncMemo(getStatusAgreement, [], []);
  const agreementType = useAsyncMemo(getAgreementType, [], []);
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { refresh, ...gridProps } = useGrid(
    purposes,
    regDoc,
    status,
    agreementType,
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
  const zalogControl = useZalogControls({
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
  const { processRowUpdate, RenderDialog } = useRowUpdater(refresh);

  const { getRowHeight, refreshHeight } = useCheck();
  return (
    <Grid item container xs direction={"column"}>
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
          slots={{
            toolbar: AgreementTableToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: { refresh, handleOpen, refreshHeight },
          }}
          onProcessRowUpdateError={(e) => {
            enqueueSnackbar(`Возникла ошибка ${e}`, { variant: "error" });
          }}
          processRowUpdate={processRowUpdate}
          disableAggregation // убрал ненужные функции
          disableRowGrouping // убрал ненужные функции
          filterMode="server"
          pagination
          paginationMode="server"
          disableMultipleColumnsSorting
          getRowClassName={(params) =>
            `super-app-theme--${params.row.statusAgreement}`
          }
          onClipboardCopy={(copiedString) => {
            enqueueSnackbar(`Скопировано: ${copiedString}`, {
              hideIconVariant: true,
              variant: "info",
            });
          }}
          rowHeight={64}
          getRowHeight={getRowHeight}
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
      {zalogControl.openZalog && (
        <ZalogDialog
          open={zalogControl.openZalog}
          onClose={zalogControl.handleCloseZalog}
          personId={zalogControl.zalogAgreementId}
        />
      )}
    </Grid>
  );
}
