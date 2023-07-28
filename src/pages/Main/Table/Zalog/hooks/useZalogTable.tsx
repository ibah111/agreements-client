import useZalogColumns from "./useZalogColumns";
import getPersonProperty from "../../../../../api/PersonPropertiesLink/getPersonProperty";
import useAsyncMemo from "../../../../../utils/asyncMemo";

export default function useZalogTable(personId: number) {
  const columns = useZalogColumns();
  const rows = useAsyncMemo(() => getPersonProperty(personId), [personId], []);

  return { rows, columns };
}
