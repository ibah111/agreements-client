import React from "react";
import { getColumns } from "./ScheduleLinkColumns";
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import ScheduleDialog from "../ScheduleDialog";
import { ScheduleLinkControl } from "./ScheduleLinkControl";
import { ScheduleLinkToolbar } from "./ScheduleToolbar";
interface Props {
  id_agreement: number;
  open: boolean;
  onClose: VoidFunction;
}
export default function ScheduleLinkDialog(props: Props) {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { open, id, rows, handleCloseSchedule } = ScheduleLinkControl({
    onClose: props.onClose,
    DialogTarget: DialogTarget,
  });
  const columns = getColumns();
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="xl">
        <DialogTitle>{`Созданные графики на соглашение ${props.id_agreement}`}</DialogTitle>
        <DialogContent>
          <Grid
            sx={{
              height: 300,
              width: "100%",
            }}
          >
            <DataGridPremium
              columns={columns}
              rows={rows}
              slots={{ toolbar: ScheduleLinkToolbar }}
              slotProps={{
                toolbar: {
                  DialogTarget: DialogTarget,
                  id_agreement: id,
                  setOpen: open,
                },
              }}
            />
          </Grid>
          {open && (
            <ScheduleDialog
              id_agreement={props.id_agreement}
              open={open}
              onClose={handleCloseSchedule}
              DialogTarget={DialogTarget}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
