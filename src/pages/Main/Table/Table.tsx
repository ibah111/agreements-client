import { Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import getAgreementType from "../../../api/getAgreementType";
import getPurposes from "../../../api/getPurpose";
import getRegDoc from "../../../api/getRegDocType";
import getStatusAgreement from "../../../api/getStatusAgreement";
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
import useDeleteControl from "./DataTable/DeleteAgreement/useDeleteControl";
import DeleteDialog from "./DataTable/DeleteAgreement/DeleteDialog";
import CommentDialog from "./CommentDialog";
import useLinkDebtsControl from "../../LinkDebtsDialog/useLinkDebtsControl";
import LinkDebtsDialog from "../../LinkDebtsDialog";
import useCommentControl from "./CommentDialog/hooks/useCommentControl";
import useScheduleControl from "./ScheduleDialog/ScheduleDataGrid/useScheduleControl";
import ScheduleLinkDialogGrid from "./ScheduleDialog/ScheduleLinkDialogGrid";

export class EventDialog<Value = number | string | object> extends Event {
  constructor(type: CustomEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export enum CustomEvents {
  onOpenCardDialog = "onOpenCardDialog",
  onOpenDialog = "onOpenDialog",
  onOpenZalogDialog = "onOpenZalogDialog",
  onOpenDeleteDialog = "onOpenDeleteDialog",
  onOpenCommentDialog = "onOpenCommentDialog",
  onOpenScheduleDialog = "onOpenScheduleDialog",
}

export interface OnOpenZalogDialogProps {
  personId: number;
  agreementId: number;
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
  const deleteDialogControl = useDeleteControl({
    DialogTarget,
    onClose: () => {
      refresh();
    },
  });
  const commentDialogControl = useCommentControl({
    DialogTarget,
    onClose: () => {
      handleClose();
    },
  });
  const scheduleDialogControl = useScheduleControl({
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
          disableAggregation
          disableRowGrouping
          filterMode="server"
          pagination
          paginationMode="server"
          sortingMode="server"
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
          agreementId={linkDialogControl.agreementId}
        />
      )}
      {cardIpControl.openCard && (
        <CardIpDialog
          open={cardIpControl.openCard}
          onClose={cardIpControl.handleCloseCard}
          agreement_id={cardIpControl.agreementIdCard}
        />
      )}
      {zalogControl.openZalog && (
        <ZalogDialog
          open={zalogControl.openZalog}
          onClose={zalogControl.handleCloseZalog}
          id_agreement={zalogControl.agreementId}
          id_person={zalogControl.personId}
        />
      )}
      {deleteDialogControl.openDeleteDialog && (
        <DeleteDialog
          open={deleteDialogControl.openDeleteDialog}
          onClose={deleteDialogControl.handleCloseDeleteDialog}
          id_agreement={deleteDialogControl.deleteAgreementId}
        />
      )}
      {commentDialogControl.openCommentDialog && (
        <CommentDialog
          id_agreement={commentDialogControl.commentAgreementId}
          open={commentDialogControl.openCommentDialog}
          onClose={commentDialogControl.handleCloseCommentDialog}
        />
      )}
      {scheduleDialogControl.openSchedule && (
        <ScheduleLinkDialogGrid
          open={scheduleDialogControl.openSchedule}
          id_agreement={scheduleDialogControl.agreementId}
          onClose={scheduleDialogControl.handleCloseSchedule}
        />
      )}
    </Grid>
  );
}
