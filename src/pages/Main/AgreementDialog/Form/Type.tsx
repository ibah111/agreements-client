import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import getAgreementType, {
  AgreementType,
} from "../../../../api/getAgreementType";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Type() {
  const [type, setType] = React.useState<AgreementType[]>([]);
  React.useEffect(() => {
    getAgreementType().then((res) => setType(res));
  }, []);
  const data = useAgreementData("agreement_type");
  return (
    <Grid xs={2} item>
      <FormControl error={data.error} fullWidth>
        <InputLabel id="type-label">Тип соглашения</InputLabel>
        <Select
          labelId="type-label"
          label="Тип соглашения"
          value={data.value}
          required={data.required}
          onChange={(event) => data.onChange(Number(event.target.value))}
        >
          {type?.map((item) => (
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
