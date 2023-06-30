import { Checkbox, FormControlLabel } from "@mui/material";
export default function CheckboxRowHeight({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <FormControlLabel
      label="Изменить высоту ячеек"
      control={<Checkbox onChange={onClick} />}
    />
  );
}
