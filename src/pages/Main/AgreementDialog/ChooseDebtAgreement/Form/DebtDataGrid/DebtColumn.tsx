import { GridColDef } from "@mui/x-data-grid-premium";
import { Agreement } from "../../../../../../Models/Agreement";

export default function DebtColumns(refresh: () => void) {
  const columns: GridColDef<Agreement>[] = [
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дата заключения",
      field: "conclusion_date",
      width: 150,
      editable: true,
      type: "date",
      valueGetter: (params) => new Date(params.value),
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дата заключения",
      field: "conclusion_date",
      width: 150,
      editable: true,
      type: "date",
      valueGetter: (params) => new Date(params.value),
    },
  ];
  return columns;
}
