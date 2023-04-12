import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import { useAppDispatch } from "../../../../Reducer";
import getPurposes from "../../../../api/getPurpose";
import useAsyncMemo from "../../../../utils/asyncMemo";
import useAgreementData from "../../../../Hooks/useAgreementData";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function Purpose(props: CreateAgreementDialogProps) {
  const dispatch = useAppDispatch();
  const purposes = useAsyncMemo(() => getPurposes(), [props.open]);
  const data = useAgreementData("purpose");
  return (
    <Grid xs={2} item>
      <FormControl fullWidth>
        <InputLabel id="purpose-label">Назначение</InputLabel>
        <Select
          labelId="purpose-label"
          label="Назначение"
          value={data.value}
          onChange={(event) =>
            dispatch(
              setAgreementProperty(["purpose", event.target.value as number])
            )
          }
        >
          {purposes?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
