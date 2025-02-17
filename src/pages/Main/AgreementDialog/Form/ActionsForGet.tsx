import { Grid, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function ActionsForGet() {
  const dispatch = useAppDispatch();
  const data = useAgreementData("actions_for_get");
  return (
    <Grid xs={4} item>
      <TextField
        fullWidth
        label="Действия для пол-я листа"
        type="string"
        onChange={(event) =>
          dispatch(
            setAgreementProperty(["actions_for_get", event.target.value])
          )
        }
        value={data.value}
      />
    </Grid>
  );
}
