import useZalogColumns from "./useZalogColumns";
import React from "react";
import { PersonProperty } from "@contact/models";
import getLinkedPersonProperties from "../../../../../api/PersonPropertiesLink/getLinkedPersonProperties";

export default function useZalogTable(id_agreement: number) {
  const [loading, setLoading] = React.useState(false);
  const [properties, setProperties] = React.useState<PersonProperty[]>([]);
  const refresh = React.useCallback(() => {
    setLoading(true);
    const sub =
      getLinkedPersonProperties(id_agreement).subscribe(setProperties);
    sub.add(() => setLoading(false));
    return sub.unsubscribe.bind(sub);
  }, [id_agreement]);

  React.useEffect(() => {
    return refresh();
  }, [refresh]);

  const columns = useZalogColumns(id_agreement, refresh);
  return { refresh, loading, rows: properties, columns };
}
