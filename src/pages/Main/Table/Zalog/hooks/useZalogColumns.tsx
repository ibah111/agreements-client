import { GridColDef } from "@mui/x-data-grid-premium";
import { PersonProperty } from "@contact/models";
import { getParam } from "../../../../../utils/getPersonParams";
import DeleteZalogFromAgr from "../DeleteZalogFromAgr";

export default function useZalogColumns(
  id_agreement: number,
  refresh: VoidFunction
) {
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
      headerName: "Статус",
      field: "status",
      valueGetter(params) {
        return params.row.StatusDict?.name;
      },
    },
    {
      align: "center",
      width: 150,
      headerAlign: "center",
      headerName: "Цвет",
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
    {
      headerName: "Delete",
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <DeleteZalogFromAgr
          id_agreement={id_agreement}
          id_person_property={params.row.id}
          refresh={refresh}
        />,
      ],
    },
  ];
  return columns;
}
