import { DataGridPremium } from "@mui/x-data-grid-premium";
import { scheduleColumns } from "./scheduleColumns";
import useScheduleTable from "./useScheduleTable";
import ScheduleToolbar from "./ScheduleToolbar/ScheduleToolbar";
import DetailPage from "./DetailPanelContent/DetailPage";

interface ScheduleProps {
  id_agreement: number;
}
export default function ScheduleTable(props: ScheduleProps) {
  const { rows, loading, refresh } = useScheduleTable(props.id_agreement);
  const check_rows = () => {
    if (!rows) return [];
    else return rows;
  };
  const columns = scheduleColumns(refresh);

  return (
    <DataGridPremium
      columnVisibilityModel={{
        id: false,
        id_agreement: false,
      }}
      disableColumnPinning
      disableAggregation
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
        toolbar: { refresh },
      }}
    />
  );
}
