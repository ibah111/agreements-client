import { DataGridPremium } from "@mui/x-data-grid-premium";
import { scheduleColumns } from "./scheduleColumns";
import useScheduleTable from "./useScheduleTable";
import { enqueueSnackbar } from "notistack";
import ScheduleToolbar from "./ScheduleToolbar/ScheduleToolbar";
import getCalcsInMonth from "../../../../../api/SchedulePayments/getCalcsInMonth";
import { Stack, Paper } from "@mui/material";
import useDetailCols from "./DetailPanelContent/DetailPanelContent.columns";
import React from "react";
import { DebtCalcInstance } from "../../../../../Models/DebtCalc";

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

  const [dRows, setDRows] = React.useState<DebtCalcInstance[]>([]);
  const { detailPanelColumns } = useDetailCols();

  const getDetailPanelContent = () => (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <DataGridPremium
            density="compact"
            columns={detailPanelColumns}
            rows={dRows}
            sx={{ flex: 1 }}
            hideFooter
            autoHeight
            getRowId={(row) => row.id!}
          />
        </Stack>
      </Paper>
    </Stack>
  );

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
      getDetailPanelContent={getDetailPanelContent}
      onDetailPanelExpandedRowIdsChange={(value) => {
        if (value.length > 0) {
          const request_id = value[value.length - 1] as number;
          enqueueSnackbar(`Показываю зарегистированные платежи ${request_id}`, {
            variant: "info",
            autoHideDuration: 1000,
          });
          getCalcsInMonth(request_id).subscribe(setDRows);
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
