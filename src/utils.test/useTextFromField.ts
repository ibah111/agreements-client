import React, { ChangeEvent, useCallback } from "react";
import { TextField, ValidationResult, Validator, validateValue } from "./types";

export function useTextFormField(
  id: string,
  validators: Validator<string>[],
  init = ""
): TextField {
  const [value, setValue] = React.useState(init);
  const [error, setError] = React.useState<ValidationResult>(null);

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const val = event.target.value;
      setValue(val);
      setError(await validateValue(val, validators));
    },
    [validators]
  );

  const handleBlur = useCallback(async () => {
    setError(await validateValue(value, validators));
  }, [validators, value]);

  const hasError = useCallback(async () => {
    const err = await validateValue(value, validators);
    setError(err);

    return !!err;
  }, [validators, value]);

  return {
    id,
    value,
    error,
    hasError,
    handleBlur,
    handleChange,
  };
}
