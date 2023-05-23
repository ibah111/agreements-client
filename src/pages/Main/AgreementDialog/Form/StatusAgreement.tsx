import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import getStatusAgreement, {
  StatusAgreement,
} from "../../../../api/getStatusAgreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function StatusAgreementType() {
  const [status, setStatus] = React.useState<StatusAgreement[]>([]);
  React.useEffect(() => {
    getStatusAgreement().then((res) => setStatus(res));
  });
  const data = useAgreementData("statusAgreement");
  return (
    <Grid xs={2} item>
      <FormControl error={data.error} fullWidth>
        <InputLabel id="statusAgreement-label">Статус соглашения</InputLabel>
        <Select
          labelId="statusAgreement-label"
          label="Статус соглашения"
          value={data.value}
          required={data.required}
          onChange={(event) => data.onChange(Number(event.target.value))}
        >
          {status?.map((item) => (
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
