import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import { useAppSelector } from "../../../../Reducer";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { AgreementCreateEvents, AgreementEventDialog } from "..";
interface CarProps {
  eventTarget: EventTarget;
  id_person: number;
}
export default function Car(props: CarProps) {
  const agreement_type = useAppSelector(
    (state) => state.Agreement.agreement_type
  );
  const data = useAgreementData("car", { agreement_type });
  return (
    <Grid xs item>
      <TextField
        fullWidth
        label="Машина"
        type="string"
        onChange={(event) => {
          data.onChange(event.target.value);
        }}
        value={data.value}
        helperText={data.helperText}
        color="warning"
        focused
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  props.eventTarget.dispatchEvent(
                    new AgreementEventDialog(
                      AgreementCreateEvents.onOpenCar,
                      props.id_person
                    )
                  );
                }}
              >
                <DriveEtaIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}
