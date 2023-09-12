import { ChangeEvent } from "react";

export type DefaultField = {
  id: string;
  /**
   * мб не только string
   */
  value: string;
  error: null | string;
  hasError: () => Promise<boolean>;
};
export type TextField = DefaultField & {
  handleChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleBlur: () => void;
};
export type ValidationResult = string | null;

export type Validator<T> = (params: T) => Promise<ValidationResult>;

export type GetValidator<Options, Params> = (
  otpions?: Options
) => Validator<Params>;

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

export type SimpleKeys<T extends object> = keyof SimpleItem<T>;

export const required: GetValidator<string, string> = (
  message = "Required field"
) => {
  return async (value) => (value ? null : message);
};

/**
 *
 * @param value вАлУе
 * @param validators = [required(), minLength(5), maxLength(150)]
 * @returns
 */

export const validateValue = async <T>(
  value: T,
  validators: Validator<T>[]
): Promise<ValidationResult> => {
  let valResult: ValidationResult = null;
  let i = 0;

  while (valResult === null && i < validators.length) {
    const res = await validators[i](value);
    if (res) {
      valResult = res;
    }
    i++;
  }

  return valResult;
};
