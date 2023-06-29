import { plainToInstance } from "class-transformer";
import React from "react";
import getLinkedLawExec from "../../../../../api/getLinkedLawExec";
import { LawExecInstance } from "../../../../../Models/LawExec";
import useZalogColumns from "./useZalogColumns";

export default function useZalogTable(agreementId: number) {
  const zalogColumns = useZalogColumns();
  const [cardRows, setCardRows] = React.useState<LawExecInstance[]>([]);

  const refresh = React.useCallback(() => {
    const sub = getLinkedLawExec(agreementId).subscribe((res) => {
      const cardData = plainToInstance(LawExecInstance, res);
      setCardRows(cardData);
    });
    return sub.unsubscribe.bind(sub);
  }, [agreementId]);

  return { rows: cardRows, columns: zalogColumns, refresh };
}
