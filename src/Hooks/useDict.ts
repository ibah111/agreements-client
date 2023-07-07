import React from "react";
import getDict from "../api/getDict";
import { RootState, useAppDispatch, useAppSelector } from "../Reducer";
import { setDict } from "../Reducer/Dict";
import { createSelector } from "@reduxjs/toolkit";
import { Dict } from "@contact/models";
const selector = createSelector(
  (state: RootState) => state.Dict,
  (_: unknown, id: number) => id,
  (state: Record<number, Dict[]>, id: number) => state[id] || []
);
export default function useDict(id: number) {
  const dict = useAppSelector((state) => selector(state, id));
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (dict.length === 0) {
      const sub = getDict(id).subscribe((res) => dispatch(setDict(res)));
      return sub.unsubscribe.bind(sub);
    }
  }, [dict, dispatch, id]);
  return dict;
}
