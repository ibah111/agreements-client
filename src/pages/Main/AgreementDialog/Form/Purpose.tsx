import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import getPurposes, { Purpose } from "../../../../api/getPurpose";
import useAgreementData from "../../../../Hooks/useAgreementData";
import React from "react";
import FormHelperText from "@mui/material/FormHelperText";

export default function PurposeField() {
  const [purposes, setPurposes] = React.useState<Purpose[]>([]);
  React.useEffect(() => {
    getPurposes().then((res) => setPurposes(res));
  }, []);

  const data = useAgreementData("purpose");
  return (
    <Grid xs={2} item>
      <FormControl error={data.error} fullWidth>
        <InputLabel id="purpose-label">Назначение</InputLabel>
        <Select
          labelId="purpose-label"
          label="Назначение"
          value={data.value}
          required={data.required}
          onChange={(event) => data.onChange(Number(event.target.value))}
        >
          {purposes?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
        {data.helperText && <FormHelperText>{data.helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
}
