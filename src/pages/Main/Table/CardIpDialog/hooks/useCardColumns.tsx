import { GridColDef } from "@mui/x-data-grid-premium";
import { LawExecInstance } from "../../../../../Models/LawExec";
interface useCardProps {
  agreementId: number;
}
export default function useCardColumns(props: useCardProps) {
  const columns: GridColDef<LawExecInstance>[] = [
    {
      field: "court_doc_num",
      headerAlign: "center",
      align: "center",
      headerName: "Номер ИД",
    },
    {
      headerAlign: "center",
      align: "center",
      headerName: "Номер ИП",
      field: "fssp_doc_num",
    },
    {
      headerAlign: "center",
      align: "center",
      headerName: "Статус",
      field: "state",
    },
  ];
  return columns;
}
