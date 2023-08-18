import React from "react";
import { DebtCalcInstance } from "../../../../../../Models/DebtCalc";
import useDetailCols from "./DetailPanelContent.columns";
import { Stack, Paper } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import getCalcsInMonth from "../../../../../../api/SchedulePayments/getCalcsInMonth";

interface DPC {
  id_payment: number;
}

export default function DetailPage(props: DPC) {
  const [dRows, setDRows] = React.useState<DebtCalcInstance[]>([]);

  const request = React.useCallback(() => {
    getCalcsInMonth(props.id_payment).subscribe(setDRows);
  }, [props.id_payment]);

  React.useEffect(() => {
    request();
  }, [request]);

  return (
    <PaymentCard id_payment={props.id_payment} rows={dRows} refresh={request} />
  );
}

interface PropsDetail {
  id_payment: number;
  rows: DebtCalcInstance[];
  refresh: () => void;
}
function PaymentCard(props: PropsDetail) {
  const { detailPanelColumns } = useDetailCols();
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
            rows={props.rows}
            sx={{ flex: 1 }}
            hideFooter
            autoHeight
            getRowId={(row) => row.id!}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
