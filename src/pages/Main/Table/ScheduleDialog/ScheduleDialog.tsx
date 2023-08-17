import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleTable from "./ScheduleDataGrid/scheduleTable";
import useScheduleTable from "./ScheduleDataGrid/useScheduleTable";
interface ScheduleDialogProps {
  id_agreement: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function ScheduleDialog(props: ScheduleDialogProps) {
  const { refresh } = useScheduleTable(props.id_agreement);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
        <DialogTitle>{`График платежей / Внесенные платежи / Соглашение №${props.id_agreement}`}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <ScheduleForm
              id_agreement={props.id_agreement}
              refreshTab={refresh}
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Grid>
            <ScheduleTable id_agreement={props.id_agreement} />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
