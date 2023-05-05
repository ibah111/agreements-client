import React from "react";
import { useAppDispatch, useAppSelector } from "../Reducer";
import {
  AgreementData,
  setAgreementProperty,
} from "../Reducer/Agreement/Agreement";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import checker from "./Validation/checker";
import { ResultData } from "./Validation/ResultData";

export default function useAgreementData<T extends keyof AgreementData>(
  name: T
): ResultData<AgreementData, T> {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) =>
    state.Agreement?.[name] === undefined || state.Agreement?.[name] === null
      ? ""
      : state.Agreement?.[name]
  );

  const setValue = React.useCallback(
    (value: AgreementData[T] | null | undefined) => {
      if (value === undefined || value == null) {
        dispatch(setAgreementProperty([name, undefined]));
      } else {
        dispatch(setAgreementProperty([name, value]));
      }
    },
    [dispatch, name]
  );

  React.useEffect(() => {
    if (value === "") {
      dispatch(setAgreementProperty([name, undefined]));
    }
  }, [dispatch, name, value]);

  const { required, error, helperText } = React.useMemo(
    () => checker(AgreementInstance, name, value),
    [name, value]
  );
  return { value, onChange: setValue, required, error, helperText };
}
