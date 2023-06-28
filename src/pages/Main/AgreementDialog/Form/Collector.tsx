import { Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Collector() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("collector");
  return (
    <Grid xs={4} item>
      <TextField
        fullWidth
        label="Взыскатель"
        type="string"
        value={data.value}
        onChange={(event) =>
          dispatch(setAgreementProperty(["collector", event.target.value]))
        }
      />
    </Grid>
  );
}
