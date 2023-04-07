import { Grid, TextField } from "@mui/material";
import { t } from "i18next";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function NameAgr() {
  const { onChange, value, error, helperText, required } =
    useAgreementData("FIO");
  return (
    <Grid item xs={5} style={{ marginTop: "10px", marginBottom: "0px" }}>
      <TextField
        label={t("form.search.FIO")}
        fullWidth
        size="medium"
        onChange={(event) => onChange(event.target.value)}
        value={value}
        error={error}
        helperText={helperText}
        required={required}
      />
    </Grid>
  );
}
