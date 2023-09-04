import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import moment from "moment";
import React from "react";

import requiredCheck from "./requiredCheck";

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
    const dataAditional = plainToInstance(example, { [field]: null });
    const dataAditionalErrors = validateSync(dataAditional, {
      skipUndefinedProperties: true,
      groups: validateGroups,
    });
    result.required = requiredCheck(dataAditionalErrors, field.toString());
    return result;
  }, [example, field, validateGroups]);
}
