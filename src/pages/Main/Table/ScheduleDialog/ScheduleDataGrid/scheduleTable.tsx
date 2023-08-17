import { DataGridPremium } from "@mui/x-data-grid-premium";
import { scheduleColumns } from "./scheduleColumns";
import useScheduleControl from "./useScheduleControl";
import useScheduleTable from "./useScheduleTable";
interface ScheduleProps {
  id_agreement: number;
}
export default function ScheduleTable(props: ScheduleProps) {
  const columns = scheduleColumns();
  const { rows, loading, refresh } = useScheduleTable(props.id_agreement);
  const check_rows = () => {
    if (!rows) return [];
    else return rows;
  };
  return (
    <DataGridPremium
      columns={columns}
      rows={check_rows()}
      loading={loading}
      autoHeight
    />
  );
}
