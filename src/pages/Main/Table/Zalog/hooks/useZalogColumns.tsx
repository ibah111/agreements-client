import { GridColDef } from "@mui/x-data-grid-premium";
import { LawExecInstance } from "../../../../../Models/LawExec";
export default function useCardColumns() {
  const columns: GridColDef<LawExecInstance>[] = [
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
  ];
  return columns;
}
