import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import getPurposes, { Purpose } from "../../../../api/getPurpose";
import useAgreementData from "../../../../Hooks/useAgreementData";
import React from "react";

export default function PurposeField() {
  const [purposes, setPurposes] = React.useState<Purpose[]>([]);
  React.useEffect(() => {
    getPurposes().then((res) => setPurposes(res));
  }, []);

  const data = useAgreementData("purpose");
  return (
    <Grid xs={2} item>
      <FormControl fullWidth>
        <InputLabel id="purpose-label">Назначение</InputLabel>
        <Select
          labelId="purpose-label"
          label="Назначение"
          value={data.value}
          error={data.error}
          required={data.required}
          onChange={(event) => data.onChange(Number(event.target.value))}
        >
          {purposes?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
