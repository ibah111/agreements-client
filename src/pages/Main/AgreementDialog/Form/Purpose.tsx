import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";
import getPurposes from "../../../../api/getPurpose";
import useAsyncMemo from "../../../../utils/asyncMemo";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function Purpose(props: CreateAgreementDialogProps) {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  const purposes = useAsyncMemo(() => getPurposes(), [props.open]);

  return (
    <Grid xs={2} item>
      <FormControl fullWidth>
        <InputLabel id="purpose-label">Назначение</InputLabel>
        <Select
          labelId="purpose-label"
          label="Назначение"
          value={agreement.purpose || ""}
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
