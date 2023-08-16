import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleTable from "./ScheduleDataGrid/scheduleTable";
interface ScheduleDialogProps {
  id_agreement: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function ScheduleDialog(props: ScheduleDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog open={open} onClose={props.onClose} fullWidth>
        <DialogTitle>График платежей / Внесенные платежи</DialogTitle>
        <DialogContent>
          <Grid>
            <ScheduleForm />
          </Grid>
          <Grid>
            <ScheduleTable />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
