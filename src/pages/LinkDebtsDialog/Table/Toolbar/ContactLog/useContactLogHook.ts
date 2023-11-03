import React from "react";
import useContactColumns from "./useContactColumns";
import { ContactLog } from "@contact/models";
import getContactLog from "../../../../../api/ContactLog/getContactLog";
interface LogProps {
  id_agreement: number;
  DialogTarget: EventTarget;
}
export default function useContactLogHook(props: LogProps) {
  const columns = useContactColumns(props.DialogTarget);
  const [rows, setRows] = React.useState<ContactLog[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const callback = React.useCallback(() => {
    setLoading(true);
    const sub = getContactLog(props.id_agreement).subscribe((res) => {
      setRows(res);
      setLoading(false);
    });
    return sub.unsubscribe.bind(sub);
  }, [props.id_agreement]);

  React.useEffect(() => {
    return callback();
  }, [callback]);
  return { columns, rows, loading };
}
