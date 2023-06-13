import { plainToInstance } from "class-transformer";
import React from "react";
import getLinkedLawExec from "../../../../../api/getLinkedLawExec";
import { LawExecInstance } from "../../../../../Models/LawExec";
import useCardColumns from "./useCardColumns";

export default function useCardTable(agreementId: number) {
  const cardColumns = useCardColumns();
  const [cardRows, setCardRows] = React.useState<LawExecInstance[]>([]);

  const refresh = React.useCallback(() => {
    const sub = getLinkedLawExec(agreementId).subscribe((res) => {
      const cardData = plainToInstance(LawExecInstance, res);
      setCardRows(cardData);
    });
    return sub.unsubscribe.bind(sub);
  }, [agreementId]);

  return { rows: cardRows, columns: cardColumns, refresh };
}
