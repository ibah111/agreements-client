import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import getPurposes from "../../../../api/getPurpose";
import useAgreementData from "../../../../Hooks/useAgreementData";
import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import useAsyncMemo from "../../../../utils/asyncMemo";

export default function PurposeField() {
  const purposes = useAsyncMemo(getPurposes, []);
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
          onChange={(event) =>
            data.onChange(
              event.target.value ? Number(event.target.value) : null
            )
          }
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
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
