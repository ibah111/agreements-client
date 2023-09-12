import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import React from "react";
import requiredCheck from "../Hooks/Validation/requiredCheck";
interface AdditionalCheckerData {
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  required?: boolean;
}

export default function useAdditionalCheckerData<T extends object>(
  example: ClassConstructor<T>,
  field: keyof T,
  validateGroups?: string[]
) {
  return React.useMemo(() => {
    const result: AdditionalCheckerData = {};

    const dataAdditional = plainToInstance(example, {
      [field]: null,
    });

    const dataAdditionalErrors = validateSync(dataAdditional, {
      skipUndefinedProperties: true,
      groups: validateGroups,
    });
    result.required = requiredCheck(dataAdditionalErrors, field.toString());
    return result;
  }, [example, field, validateGroups]);
}
