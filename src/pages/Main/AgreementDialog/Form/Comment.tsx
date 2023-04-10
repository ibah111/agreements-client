import { Grid, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function Comment() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid xs={2} item>
      <TextField
        label="Комментарий"
        type="string"
        value={agreement.comment || ""}
        onChange={(event) =>
          dispatch(setAgreementProperty(["comment", event.target.value]))
        }
      />
    </Grid>
  );
}
