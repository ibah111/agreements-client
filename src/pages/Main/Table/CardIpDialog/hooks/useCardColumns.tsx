import { GridColDef } from "@mui/x-data-grid-premium";
import { LawExecInstance } from "../../../../../Models/LawExec";
export default function useCardColumns() {
  const columns: GridColDef<LawExecInstance>[] = [
    {
      width: 170,
      headerAlign: "center",
      align: "center",
      headerName: "Имя продукта",
      field: "name",
    },
    {
      width: 170,
      headerAlign: "center",
      align: "center",
      headerName: "Статус",
      field: "state",
      valueGetter: (params) => {
        return params.row.StateDict?.name;
      },
    },
    {
      width: 170,
      field: "court_name",
      headerName: "Имя суда",
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return params.row.court_name;
      },
    },
    {
      width: 170,
      field: "court_doc_num",
      headerAlign: "center",
      align: "center",
      headerName: "Номер ИД",
    },
    {
      width: 160,
      headerAlign: "center",
      align: "center",
      headerName: "Номер ИП",
      field: "fssp_doc_num",
    },
  ];
  return columns;
}
