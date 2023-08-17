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
interface ScheduleDialogProps {
  id_agreement: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function ScheduleDialog(props: ScheduleDialogProps) {
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
        <DialogTitle>{`График платежей / Внесенные платежи / Соглашение №${props.id_agreement}`}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <ScheduleForm id_agreement={props.id_agreement} />
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
