import { Debt } from "@contact/models";
import { Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { getPersonDebts } from "../../../../api/getDebtData";
import { debtColumns } from "./Form/DebtDataGrid/DebtColumn";
// import createAgreement from "../../../../api/createAgreement";
interface TableProps {
  loading: boolean;
}

export default function ChooseDebtAgreement(params: TableProps) {
  const [debts, setDebts] = React.useState<Debt[]>([]);

  const refresh = React.useCallback(() => {
    getPersonDebts().then((res) => {
      setDebts(res);
      setLoading(false);
    });
  }, []);
  React.useEffect(() => {
    refresh();
  }, [refresh]);
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      <Grid style={{ height: 300, width: "100%" }}>
        <DataGridPremium
          columns={debtColumns}
          rows={debts}
          loading={loading}
          // onCellDoubleClick={createAgreement}
        />
      </Grid>
    </>
  );
}
