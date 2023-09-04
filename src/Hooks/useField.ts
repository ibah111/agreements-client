import React from "react";
import type moment from "moment-timezone";
import checker from "./Validation/checker";
import { ClassConstructor } from "class-transformer";
import useAdditionalCheckerData from "./Validation/useAdditionalData";

export type IsSimple<
  Item extends object,
  Key extends keyof Item
> = Item[Key] extends
  | string
  | number
  | boolean
  | Date
  | moment.Moment
  | null
  | undefined
  ? Key
  : never;

export type SimpleItem<Item extends object> = {
  [Key in keyof Item as IsSimple<Item, Key>]: Item[Key];
};

type SimpleKeys<T extends object> = keyof SimpleItem<T>;

export interface Field<Obj extends object, Key extends SimpleKeys<Obj>> {
  value: NonNullable<Obj[Key]> | "";
  onChange: (value: Obj[Key]) => void;
  error: boolean;
  helperText?: string;
  name: Key;
  required?: boolean;
  resetValue: VoidFunction;
}

export default function useField<
  Example extends object,
  Key extends SimpleKeys<Example>
>(
  example: ClassConstructor<Example>,
  name: Key,
  initValue: Example[Key],
  validationAdditionalData: Partial<Example>
): Field<Example, Key> {
  const [field, setField] = React.useState(initValue);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    checker(example, name, initValue, validationAdditionalData);
  }, [example, initValue, name, validationAdditionalData]);

  const additionalData = useAdditionalCheckerData(example, name);

  const onChange = React.useCallback(
    (value: Example[Key]) => {
      const result = checker(
        example,
        name,
        initValue,
        validationAdditionalData
      );
      setError(result.helperText);
      setField(value);
    },
    [example, initValue, name, validationAdditionalData]
  );

  const resetValue = React.useCallback(() => {
    onChange(initValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  return {
    error: Boolean(error),
    onChange,
    name,
    resetValue,
    value: field || "",
    ...additionalData,
  };
}

type KeysToTuple<
  Obj extends object,
  T extends SimpleKeys<Obj>
> = T extends SimpleKeys<Obj> ? Field<Obj, T> : never;

export function useForm<T extends object, Keys extends SimpleKeys<T>>(
  fields: KeysToTuple<T, Keys>[],
  onSubmit: (formData: T) => void,
  initValues?: T
) {
  const handleSubmit = React.useCallback(() => {
    const formData = {} as T;
    for (const field of fields) {
      //@ts-expect-error Типы не смог свести
      formData[field.name] = field.value;
    }
    onSubmit(formData);
  }, [fields, onSubmit]);

  const setForm = React.useCallback(
    (instance: T) => {
      for (const field of fields) {
        const instanceField = instance[field.name];
        //@ts-expect-error Типы не смог свести
        field.onChange(instanceField);
      }
    },
    [fields]
  );

  const getFormData = React.useCallback(() => {
    const formData = {} as T;
    for (const field of fields) {
      //@ts-expect-error Типы не смог свести
      formData[field.name] = field.value;
    }
    return formData;
  }, [fields]);

  const getErrors = React.useCallback(() => {
    const formData = {} as Record<keyof T, string>;
    for (const field of fields) {
      //@ts-expect-error Типы не смог свести
      formData[field.name] = field.helperText;
    }
    return formData;
  }, [fields]);

  React.useEffect(() => {
    if (initValues) {
      setForm(initValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleSubmit, setForm, getFormData, getErrors };
}
