import { Debt } from "@contact/models";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { getPersonDebts } from "../../../../api/getDebtData";
import { debtColumns } from "./Form/DebtDataGrid/DebtColumn";

interface ChooseDebtAgreementProps {
  personId: number;
}

export default function ChooseDebtAgreement(props: ChooseDebtAgreementProps) {
  const [debts, setDebts] = React.useState<Debt[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getPersonDebts(props.personId).then((res) => {
      setDebts(res);
      setLoading(false);
    });
  }, [props.personId]);

  return (
    <>
      <DataGridPremium columns={debtColumns} rows={debts} loading={loading} />
    </>
  );
}
