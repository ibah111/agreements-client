import { PersonProperty, PersonPropertyParam } from "@contact/models";
import { GridValueGetterParams } from "@mui/x-data-grid-premium";

export const getParam = (typ: number) => {
  const finder = (property: PersonPropertyParam) =>
    property.r_property_typ_params_id === typ;
  return (params: GridValueGetterParams<PersonProperty>) =>
    params.row.PersonPropertyParams?.find(finder)?.value;
};
