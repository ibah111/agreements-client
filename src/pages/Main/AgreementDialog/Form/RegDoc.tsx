import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import getRegDoc from "../../../../api/getRegDocType";
import useAgreementData from "../../../../Hooks/useAgreementData";
import useAsyncMemo from "../../../../utils/asyncMemo";

export default function RegDocType() {
  const regDoc = useAsyncMemo(getRegDoc, []);
  const data = useAgreementData("new_reg_doc");
  return (
    <Grid xs={2} item>
      <FormControl error={data.error} fullWidth>
        <InputLabel id="regdoc-label">Наличие ИД</InputLabel>
        <Select
          labelId="regdoc-label"
          label="Наличие ИД"
          value={data.value}
          required={data.required}
          error={data.error}
          onChange={(event) => data.onChange(Number(event.target.value))}
        >
          {regDoc?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
