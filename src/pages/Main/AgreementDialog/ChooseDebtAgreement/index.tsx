import { Debt } from "@contact/models";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { getPersonDebts } from "../../../../api/getDebtData";
import { debtColumns } from "./Form/DebtDataGrid/DebtColumn";
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
      <DataGridPremium columns={debtColumns} rows={debts} loading={loading} />
    </>
  );
}
