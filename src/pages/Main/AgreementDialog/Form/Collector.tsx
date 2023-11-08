import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useAgreementData from "../../../../Hooks/useAgreementData";
import getAllCollectors from "../../../../api/Collector/getAllCollectors";
import useAsyncMemo from "../../../../utils/asyncMemo";
import getName from "../../../../Reducer/getName";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { AgreementCreateEvents, AgreementEventDialog } from "..";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import deleteCollector from "../../../../api/Collector/deleteCollector";

interface CollectorProps {
  eventTarget: EventTarget;
}

function AddCollector({ eventTarget }: CollectorProps) {
  return (
    <IconButton
      onClick={() => {
        eventTarget.dispatchEvent(
          new AgreementEventDialog(AgreementCreateEvents.onAddCollector)
        );
      }}
    >
      <PersonAddAltIcon />
    </IconButton>
  );
}

export default function Collector({ eventTarget }: CollectorProps) {
  const data = useAgreementData("collector_id");
  const collectors = useAsyncMemo(getAllCollectors, [], []);
  return (
    <Grid xs={2} item>
      <FormControl fullWidth>
        <InputLabel id="collector-label">Взыскатель</InputLabel>
        <Select
          startAdornment={<AddCollector eventTarget={eventTarget} />}
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
            <MenuItem key={collector.id} value={collector.id_contact}>
              {getName(collector.fio, collector.department_name)}
              <IconButton
                size="small"
                onClick={() =>
                  deleteCollector(collector.id).subscribe(() => {
                    enqueueSnackbar("Успешно удалено", {
                      variant: "info",
                    });
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
