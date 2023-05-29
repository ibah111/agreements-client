import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import getRegDoc, { RegDoc } from "../../../../api/getRegDocType";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function RegDocType() {
  const [regDoc, setRegDoc] = React.useState<RegDoc[]>([]);
  React.useEffect(() => {
    getRegDoc().then((res) => setRegDoc(res));
  }, []);
  const data = useAgreementData("new_regDoc");
  return (
    <Grid xs={2} item>
      <FormControl error={data.error} fullWidth>
        <InputLabel id="regdoc-label">Наличие ИД</InputLabel>
        <Select
          labelId="regdoc-label"
          label="Наличие ИД"
          value={data.value}
          required={data.required}
          onChange={(event) => data.onChange(Number(event.target.value))}
        >
          {regDoc?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
        {}
      </FormControl>
    </Grid>
  );
}
// Наличие ИД на исполнении
// Наличие ИД в регистраторе
// Наличие ИД в архиве
