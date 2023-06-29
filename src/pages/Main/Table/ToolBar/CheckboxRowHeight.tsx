import { Checkbox, FormControlLabel } from "@mui/material";
import { enqueueSnackbar } from "notistack";
function snackbak() {
  enqueueSnackbar("aaa", {
    variant: "success",
  });
}

export default function CheckboxRowHeight() {
  return (
    <FormControlLabel
      label="Высота ячеек"
      control={<Checkbox onChange={snackbak} />}
    />
  );
}
