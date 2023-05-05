import {
  FormControl,
  FormHelperText,
  Grid,
  InputBaseProps,
  InputLabel,
  Select,
  SxProps,
  Theme,
} from "@mui/material";

interface GridSelectFieldProps {
  xs?: number;
  label: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  inputProps?: InputBaseProps["inputProps"];
  sx?: SxProps<Theme>;
  onChange?: (value: number | undefined) => void;
  value: string | number;
  children?: React.ReactNode;
}

export default function GridSelectField(props: GridSelectFieldProps) {
  return (
    <Grid item xs={props.xs}>
      <FormControl
        size={"small"}
        fullWidth
        error={props.error}
        required={props.required}
      >
        <InputLabel sx={props.sx} size={"small"}>
          {props.label}
        </InputLabel>
        <Select
          sx={props.sx}
          inputProps={props.inputProps}
          disabled={props.disabled}
          onChange={(event) => {
            if (event.target.value === "") props.onChange?.(undefined);
            else props.onChange?.(Number(event.target.value));
          }}
          value={props.value}
          size={"small"}
          label={props.label}
        >
          {props.children}
        </Select>
        <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
    </Grid>
  );
}
