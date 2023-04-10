import { Grid, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function TaskLink() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid xs={2} item>
      <TextField
        label="Ссылка на задачу"
        type="string"
        value={agreement.task_link || ""}
        onChange={(event) =>
          dispatch(setAgreementProperty(["task_link", event.target.value]))
        }
      />
    </Grid>
  );
}
