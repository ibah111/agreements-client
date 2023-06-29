import { Checkbox, FormControlLabel } from "@mui/material";
export default function CheckboxRowHeight({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <FormControlLabel
      label="AutoRowHeight"
      control={<Checkbox onChange={onClick} />}
    />
  );
}
