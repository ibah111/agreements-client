import { DataGridPremium } from "@mui/x-data-grid-premium";
import { scheduleColumns } from "./scheduleColumns";
import useScheduleTable from "./useScheduleTable";
import getDetailPanelContent from "./DetailPanelContent/DetailPanelContent";
import { enqueueSnackbar } from "notistack";
import ScheduleToolbar from "./ScheduleToolbar/ScheduleToolbar";

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
        height: 600,
      }}
      getDetailPanelContent={getDetailPanelContent}
      onDetailPanelExpandedRowIdsChange={(value) => {
        console.log(value);
        if (value.length > 0) {
          enqueueSnackbar(`Входящие платежи ${value}`, {
            variant: "info",
          });
        }
      }}
      slots={{
        toolbar: ScheduleToolbar,
      }}
      slotProps={{
        toolbar: { refresh },
      }}
    />
  );
}
