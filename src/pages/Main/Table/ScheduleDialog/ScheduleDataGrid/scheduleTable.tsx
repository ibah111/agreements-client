import { DataGridPremium } from "@mui/x-data-grid-premium";
import { scheduleColumns } from "./scheduleColumns";
import useScheduleControl from "./useScheduleControl";

export default function ScheduleTable() {
  const columns = scheduleColumns();
  const { rows } = useScheduleControl();
  return <DataGridPremium columns={columns} rows={rows} autoHeight />;
}
