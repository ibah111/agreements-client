import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import RefreshToolbarButton from "../../../../../../components/Utils/RefreshToolbarButton";
import { Button } from "@mui/material";
import updatePayments from "../../../../../../api/SchedulePayments/updatePayments";
import { enqueueSnackbar } from "notistack";
import { Can } from "../../../../../../casl/casl";
import { Action, Subject } from "../../../../../../casl/casl.factory";

interface ScheduleToolbarProps {
  refresh: VoidFunction;
  id_schedule: number;
}
export default function ScheduleToolbar({
  id_schedule,
  refresh,
}: ScheduleToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <RefreshToolbarButton refresh={refresh} />
      <Can I={Action.Create} a={Subject.AgreementToDebt}>
        <UpdatePayments id_schedule={id_schedule} refresh={refresh} />
      </Can>
    </GridToolbarContainer>
  );
}

function UpdatePayments({ id_schedule, refresh }: ScheduleToolbarProps) {
  return (
    <Button
      onClick={() => {
        updatePayments(id_schedule).subscribe(() => {
          enqueueSnackbar("Обновляю платежи", {
            autoHideDuration: 1000,
            variant: "info",
          });
          refresh();
        });
      }}
      variant="contained"
      size="small"
    >
      {`Расчитать платежи`}
    </Button>
  );
}
