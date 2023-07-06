import { Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function Comment() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("comment");
  return (
    <Grid xs={8} item>
      <TextField
        multiline
        value={data.value}
        onChange={(event) =>
          dispatch(setAgreementProperty(["comment", event.target.value]))
        }
      />
    </Grid>
  );
}
