import React from "react";
import { getColumns } from "./ScheduleLinkColumns";
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import ScheduleDialog from "../ScheduleDialog";
import { ScheduleLinkControl } from "./ScheduleLinkControl";
import { ScheduleLinkToolbar } from "./ScheduleToolbar";
import { ScheduleSelectDebt } from "./ScheduleSelectDebt";
import getAllSchedulesByAgreement from "../../../../../api/SchedulePayments/getAllSchedulesByAgreement";
import { ScheduleLinkModel } from "./ScheduleLinkModel";
interface Props {
  id_agreement: number;
  id_person: number;
  open: boolean;
  onClose: VoidFunction;
}
/**
 * ScheduleLinkDialog as SLD
 * @param props
 * @returns
 */
export default function ScheduleLinkDialog(props: Props) {
  const [rows, setRows] = React.useState<ScheduleLinkModel[]>([]);
  React.useEffect(() => {
    //ApiRequest with id_agreement
    getAllSchedulesByAgreement(props.id_agreement).subscribe(setRows);
  }, [props.id_agreement]);
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { open, handleCloseSchedule } = ScheduleLinkControl({
    onClose: props.onClose,
    DialogTarget: DialogTarget,
  });
  const columns = getColumns({
    DialogTarget,
  });

  const [openSelect, setOpenSelect] = React.useState(false);

  const handleOpenSLD = React.useCallback(() => {
    setOpenSelect(true);
  }, []);
  const handleCloseSLD = React.useCallback(() => {
    setOpenSelect(false);
  }, []);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="xl">
        <DialogTitle>{`Графики на соглашение ${props.id_agreement}, ${props.id_person}`}</DialogTitle>
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
                  setOpenSelect: handleOpenSLD,
                },
              }}
            />
          </Grid>
          {openSelect && (
            <ScheduleSelectDebt
              open={openSelect}
              onClose={handleCloseSLD}
              id_agreement={props.id_agreement}
            />
          )}
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
