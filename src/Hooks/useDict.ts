import { Dict } from "@contact/models";
import React from "react";
import getDict from "../api/getDict";
import { useAppDispatch, useAppSelector } from "../Reducer";
import { setDict } from "../Reducer/Dict";

export default function useDict(id: number) {
  const dict = useAppSelector((state) => state.Dict[id]);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (!dict) {
      const sub = getDict(id).subscribe((res: Dict[]) =>
        dispatch(setDict(res))
      );
      return sub.unsubscribe.bind(sub);
    }
  }, [dict, dispatch, id]);
  return dict || [];
}
