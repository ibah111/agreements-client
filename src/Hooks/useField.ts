import React from "react";
import type moment from "moment-timezone";
import checker from "../Hooks/Validation/checker";
import { ClassConstructor } from "class-transformer";

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
  };
}
