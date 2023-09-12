import { SimpleKeys } from "./types";
import React from "react";

export interface FieldTypes<Obj extends object, Key extends SimpleKeys<Obj>> {
  value: NonNullable<Obj[Key]> | "";
  onChange: (value: Obj[Key]) => void;
  error: boolean;
  helperText?: string;
  name: Key;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  required?: boolean;
  resetValue: VoidFunction;
  setIsRender: React.Dispatch<React.SetStateAction<boolean>>;
  isRender: boolean;
}

export type KeysToTuple<
  Obj extends object,
  T extends SimpleKeys<Obj>
> = T extends SimpleKeys<Obj> ? FieldTypes<Obj, T> : never;

export function useForm<T extends object, Keys extends SimpleKeys<T>>(
  fields: KeysToTuple<T, Keys>[],
  onSubmit: (formData: T) => void,
  initValue: T
) {
  const handleFormSubmit = React.useCallback(() => {
    const formData = {} as T;
    for (const field of fields) {
      if (!field.isRender) continue;
      //@ts-expect-error не сведение типов
      formData[field.name] = field.value;
    }
    onSubmit(formData);
  }, [onSubmit, fields]);

  const setForm = React.useCallback(
    (instance: T) => {
      for (const field of fields) {
        const instanceField = instance[field.name];
        //@ts-expect-error не сведение типов
        field.onChange(instanceField);
      }
    },
    [fields]
  );

  const getFormData = React.useCallback(() => {
    const formData = {} as T;
    for (const field of fields) {
      //@ts-expect-error
      formData[field.name] = field.value;
    }
    return formData;
  }, [fields]);

  const getErrors = React.useCallback(() => {
    const formData = {} as Record<keyof T, string>;
    for (const field of fields) {
      //@ts-expect-error
      formData[field.name] = field.helperText;
    }
  }, [fields]);

  React.useEffect(() => {
    if (initValue) {
      setForm(initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleFormSubmit,
    setForm,
    getErrors,
    getFormData,
  };
}
