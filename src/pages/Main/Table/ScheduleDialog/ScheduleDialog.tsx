import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React from "react";
import ScheduleForm from "./ScheduleForm";
import useScheduleTable from "./ScheduleDataGrid/useScheduleTable";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import useUpdateFormControl from "./ScheduleDataGrid/UpdateForm/useUpdateFormControl";
import DetailPage from "./ScheduleDataGrid/DetailPanelContent/DetailPage";
import ScheduleToolbar from "./ScheduleDataGrid/ScheduleToolbar/ScheduleToolbar";
import UpdateForm from "./ScheduleDataGrid/UpdateForm/UpdateForm";

interface ScheduleDialogProps {
  id_agreement: number;
  open: boolean;
  onClose: VoidFunction;
  DialogTarget: EventTarget;
}
export class ScheduleEventsClass<
  Value = number | string | object
> extends Event {
  constructor(type: ScheduleEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export enum ScheduleEvents {
  onEditPayment = "onEditPayment",
}

export default function ScheduleDialog(props: ScheduleDialogProps) {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { rows, loading, refresh, columns } = useScheduleTable(
    props.id_agreement,
    DialogTarget
  );
  const check_rows = () => {
    if (!rows) return [];
    else return rows;
  };

  const updateControls = useUpdateFormControl({
    DialogTarget,
    onClose: () => {
      refresh();
    },
  });
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
        <DialogTitle>{`График платежей / Внесенные платежи / Соглашение №${props.id_agreement}`}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <ScheduleForm
              id_agreement={props.id_agreement}
              DialogTarget={props.DialogTarget}
              refresh={refresh}
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Grid>
            <DataGridPremium
              columnVisibilityModel={{
                id: false,
                id_agreement: false,
              }}
              disableColumnPinning
              disableRowGrouping
              columns={columns}
              rows={check_rows()}
              loading={loading}
              getDetailPanelHeight={() => "auto"}
              sx={{
                flex: 1,
                height: 600,
              }}
              getDetailPanelContent={(param) => (
                <DetailPage id_payment={param.row.id!} />
              )}
              slots={{
                toolbar: ScheduleToolbar,
              }}
              slotProps={{
                toolbar: { refresh: refresh, id_agreement: props.id_agreement },
              }}
            />
            {updateControls.open && (
              <UpdateForm
                open={updateControls.open}
                id_payment={updateControls.paymentId}
                refresh={updateControls.closeDialog}
              />
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
