import { Phone } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";

export default function usePhoneColumns() {
  const columns: GridColDef<Phone>[] = [
    {
      field: "id",
    },
    {
      field: "number",
    },
    {
      field: "number2",
    },
    {
      field: "fio",
    },
  ];
  /**
   * Указать тип после map, чтобы экспорт не жаловался
   */
  return columns.map<GridColDef<Phone>>((item) => ({
    ...item,
    width: 150,
    headerAlign: "center",
    align: "center",
  }));
}
