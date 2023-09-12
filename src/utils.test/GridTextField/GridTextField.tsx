import {
  CSSObject,
  Grid,
  GridSize,
  InputBaseProps,
  InputProps as StandardInputProps,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import moment from "moment";
import React from "react";

type GridFieldType =
  | "TextField"
  | "Select"
  | "DatePicker"
  | "CheckBox"
  | "MultipleSelect";

interface GridFieldBase {
  xs?: boolean | GridSize;
  label: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  inputProps?: InputBaseProps["inputProps"];
  sx?: SxProps<Theme>;
  className?: string;
  readonly?: boolean;
  textSx?: CSSObject;
}

interface GridTextFieldProps extends GridFieldBase {
  onChange?: (value: string) => void;
  value: string | number;
  multiline?: boolean;
  rows?: number;
  InputProps?: Partial<StandardInputProps>;
}
interface GridSelectFieldProps extends GridFieldBase {
  onChange?: (value: number | undefined) => void;
  value: string | number;
  children?: React.ReactNode;
}
interface GridDatePickerProps extends Omit<GridFieldBase, "inputProps"> {
  onChange?: (value: moment.Moment | undefined) => void;
  value: moment.Moment | string;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
}
interface GridCheckBoxProps
  extends Omit<GridFieldBase, "error" | "helperText"> {
  onChange?: (value: boolean | undefined) => void;
  value: boolean | string;
}
interface GridChipSelectFieldProps<T> extends GridFieldBase {
  onChange?: (value: T | undefined) => void;
  value: T | string;
  children?: React.ReactNode;
}

export type GridFieldProps<T extends GridFieldType, V> = T extends "TextField"
  ? GridTextFieldProps
  : T extends "Select"
  ? GridSelectFieldProps
  : T extends "CheckBox"
  ? GridCheckBoxProps
  : T extends "MultipleSelect"
  ? GridChipSelectFieldProps<V>
  : GridDatePickerProps;

export default function GridTextField<T extends string | number = number>(
  props: GridFieldProps<"TextField", T>
) {
  return (
    <Grid item xs={props.xs}>
      <TextField
        sx={{
          "& .MuiInputBase-root input": props.textSx ? props.textSx : {},
          ...props.sx,
        }}
        inputProps={props.inputProps}
        multiline={props.multiline}
        rows={props.rows}
        label={props.label}
        value={props.value}
        disabled={props.disabled}
        error={props.error}
        helperText={props.helperText}
        required={props.required}
        InputProps={props.InputProps}
        onChange={(event) => {
          if (props.readonly) return;
          props.onChange?.(event.target.value);
        }}
      />
    </Grid>
  );
}
