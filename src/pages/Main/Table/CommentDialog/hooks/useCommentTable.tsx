import React from "react";
import { Comments } from "../../../../../Models/Comments";
import getComments from "../../../../../api/Comments/getComments";

export default function useCommentTable(agreementId: number) {
  const [comments, setComments] = React.useState<Comments[]>([]);
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    const sub = getComments(agreementId).subscribe(setComments);
    sub.add(() => setLoading(false));
    return sub.unsubscribe.bind(sub);
  }, [agreementId]);

  React.useEffect(() => {
    return refresh();
  }, [refresh]);

  return { rows: comments, refresh, loading };
}
