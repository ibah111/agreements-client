import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import getAllCollectors from "../../../../api/getAllCollectors";
import useAsyncMemo from "../../../../utils/asyncMemo";
import getName from "../../../../Reducer/getName";

export default function Collector() {
  const data = useAgreementData("collector_id");
  const collectors = useAsyncMemo(getAllCollectors, [], []);
  return (
    <Grid xs={4} item>
      <FormControl fullWidth>
        <InputLabel id="collector-label">Взыскатель</InputLabel>
        <Select
          labelId="collector-label"
          label={"Взыскатель"}
          //@ts-ignore
          onChange={(e) => data.onChange(e.target.value)}
          value={data.value || ""}
        >
          <MenuItem>
            <em>Не выбрано</em>
          </MenuItem>
          {collectors.map((collector) => (
            <MenuItem key={collector.id} value={collector.id}>
              {getName(collector.f, collector.i, collector.o)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
