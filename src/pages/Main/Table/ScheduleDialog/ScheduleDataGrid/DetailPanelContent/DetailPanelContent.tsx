import { Paper, Stack } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { detailPanelColumns } from "./DetailPanelContent.columns";

export default function getDetailPanelContent() {
  return (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <DataGridPremium
            density="compact"
            columns={detailPanelColumns}
            rows={[]}
            sx={{ flex: 1 }}
            hideFooter
            autoHeight
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
