import { Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../Hooks/useAgreementData";

export default function TaskLink() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("task_link");
  return (
    <Grid xs={2} item>
      <TextField
        label="Ссылка на задачу"
        type="string"
        value={data.value}
        onChange={(event) =>
          dispatch(setAgreementProperty(["task_link", event.target.value]))
        }
      />
    </Grid>
  );
}
