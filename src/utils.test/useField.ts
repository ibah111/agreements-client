import { ClassConstructor } from "class-transformer";
import { SimpleKeys } from "./types";
import React from "react";
import checker from "../Hooks/Validation/checker";
import useAdditionalCheckerData from "./useAdditionalCheckerData";

interface Field<Obj extends object, Key extends SimpleKeys<Obj>> {
  value: NonNullable<Obj[Key]> | "";
  onChange: (value: Obj[Key]) => void;
  error: boolean;
  helperText?: string;
  name: Key;
  required?: boolean;
  resetValue: VoidFunction;
  setIsRender: React.Dispatch<React.SetStateAction<boolean>>;
  isRender: boolean;
}

export default function useField<
  Example extends object,
  Key extends SimpleKeys<Example>
>(
  example: ClassConstructor<Example>,
  name: Key,
  initValue: Example[Key],
  useRenderState?: boolean,
  validateAdditionalData?: Partial<Example>
): Field<Example, Key> {
  const [field, setField] = React.useState(initValue);
  const [error, setError] = React.useState<string>("");
  const [isRender, setIsRender] = React.useState(false);

  React.useEffect(() => {
    const result = checker(example, name, initValue, validateAdditionalData);
    setError(result.helperText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example, initValue, name]);

  React.useEffect(() => {
    const result = checker(example, name, initValue, validateAdditionalData);
    setError(result.helperText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example, initValue, name]);

  const onChange = React.useCallback(
    (value: Example[Key]) => {
      const result = checker(example, name, value, validateAdditionalData);
      setError(result.helperText);
      setField(value);
    },
    [example, name, validateAdditionalData]
  );

  const additionalData = useAdditionalCheckerData(example, name);

  const resetValue = React.useCallback(() => {
    onChange(initValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  return {
    value: field || "",
    onChange,
    error: Boolean(error),
    helperText: error,
    name,
    resetValue,
    setIsRender,
    isRender: useRenderState ? isRender : true,
    ...additionalData,
  };
}
