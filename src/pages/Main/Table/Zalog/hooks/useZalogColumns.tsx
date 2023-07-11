import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid-premium";
import { PersonProperty, PersonPropertyParam } from "@contact/models";
const getParam = (typ: number) => {
  const finder = (property: PersonPropertyParam) =>
    property.r_property_typ_params_id === typ;
  return (params: GridValueGetterParams<PersonProperty>) =>
    params.row.PersonPropertyParams?.find(finder)?.value;
};
export default function useZalogColumns() {
  const columns: GridColDef<PersonProperty>[] = [
    {
      align: "center",
      width: 100,
      headerAlign: "center",
      headerName: "ID",
      field: "id",
      type: "number",
    },
    {
      align: "center",
      width: 250,
      headerAlign: "center",
      headerName: "VIN",
      field: "vin",
      valueGetter: getParam(6),
    },
    {
      align: "center",
      width: 150,
      headerAlign: "center",
      headerName: "Гос.номер",
      field: "gov_number",
      valueGetter: getParam(5),
    },
    {
      align: "center",
      width: 150,
      headerAlign: "center",
      headerName: "Гос.номер",
      field: "color",
      valueGetter: getParam(3),
    },
    {
      align: "center",
      width: 250,
      headerAlign: "center",
      headerName: "Название",
      field: "car_names",
      valueGetter: getParam(7),
    },
    {
      width: 250,
      headerAlign: "center",
      headerName: "Владелец ТС",
      field: "owner_name",
      valueGetter: getParam(54),
    },
  ];
  return columns;
}
