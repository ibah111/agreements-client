import { Button } from "@mui/material";
import { Can } from "../../../../casl/casl";
import { Action, Subject } from "../../../../casl/casl.factory";
import UpdateIcon from "@mui/icons-material/Update";
import { enqueueSnackbar } from "notistack";
import syncAll from "../../../../api/Preview/syncAll";
interface UpdateProps {
  refresh: VoidFunction;
}
export default function SyncAllButton(props: UpdateProps) {
  return (
    <Can I={Action.Create} a={Subject.Agreement}>
      <Button
        startIcon={<UpdateIcon />}
        size="small"
        variant="contained"
        color={"primary"}
        onClick={() => {
          syncAll().subscribe(() => {
            enqueueSnackbar(`Соглашения обновлены`, { variant: "info" });
            props.refresh();
          });
        }}
      >{`Обновить данные`}</Button>
    </Can>
  );
}
