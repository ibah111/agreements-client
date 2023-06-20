import { GridColDef } from "@mui/x-data-grid-premium";
import { LawExecInstance } from "../../../../../Models/LawExec";
export default function useCardColumns() {
  const columns: GridColDef<LawExecInstance>[] = [
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
      width: 170,
      headerAlign: "center",
      align: "center",
      headerName: "Номер ИП",
      field: "fssp_doc_num",
    },
    {
      width: 150,
      headerAlign: "center",
      align: "center",
      headerName: "Наличие залогового имущества",
      field: "deposit_typ",
      type: "string",
      valueGetter: (params) => {
        if (params.row.deposit_typ === null || 0) return "Нет";
        else return "Есть";
      },
    },
    {
      width: 150,
      headerAlign: "center",
      headerName: "Имя залога",
      field: "deposit_name",
      type: "string",
      valueGetter: (params) => {
        if (params.row.Person?.PersonProperties?.map((item) => item.name)) {
          return params.row.Person?.PersonProperties?.map((item) => item.name);
        } else {
          return "Нет имени залога";
        }
      },
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
  ];
  return columns;
}
