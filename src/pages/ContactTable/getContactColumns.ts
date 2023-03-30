import { GridColDef } from "@mui/x-data-grid-pro";
import { t } from "i18next";

export default function getColumns(): GridColDef[] {
  //TODO переделать
  return [
    { field: "Person.id", headerName: t("form.search.id"), width: 70 },
    { field: "Debt.id", headerName: t("form.search.r_law_act_id"), width: 70 },
    { field: "id", headerName: t("form.results.law_act.id"), width: 150 },
  ];
}
