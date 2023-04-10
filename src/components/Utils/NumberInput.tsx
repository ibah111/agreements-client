import React from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";

interface CustomProps {
  onChange: (event: {
    target: { id: string; name: string; value: number | undefined };
  }) => void;
  id: string;
  name: string;
}

function isAllowed(numbers: NumberFormatValues) {
  if (
    numbers.floatValue &&
    0 < numbers.floatValue &&
    numbers.floatValue < 10000000000
  )
    return true;
  else if (numbers.floatValue === undefined) return true;
  else return false;
}

export function NumberInput(maxLength?: number) {
  return React.forwardRef<HTMLElement, CustomProps>(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, id, name, ...other } = props;
    return (
      <NumericFormat
        {...other}
        maxLength={maxLength}
        allowNegative={false}
        allowLeadingZeros={true}
        decimalScale={0}
        getInputRef={ref}
        isAllowed={isAllowed}
        onValueChange={(values) => {
          onChange({
            target: {
              name: name,
              id: id,
              value: values.floatValue,
            },
          });
        }}
      />
    );
  }) as any;
}

export function FloatInput(precision: number) {
  return React.forwardRef<HTMLElement, CustomProps>(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, id, name, ...other } = props;
    return (
      <NumericFormat
        {...other}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={precision}
        getInputRef={ref}
        isAllowed={isAllowed}
        onValueChange={(values) => {
          onChange({
            target: {
              name: name,
              id: id,
              value: values.floatValue,
            },
          });
        }}
      />
    );
  });
}
