import { Can } from "../../../../casl/casl";
import { Action, Subject } from "../../../../casl/casl.factory";
import UpdateIcon from "@mui/icons-material/Update";
import { enqueueSnackbar } from "notistack";
import syncAll from "../../../../api/Preview/syncAll";
import React from "react";
import { Subject as RxSubject, takeUntil } from "rxjs";
import { LoadingButton } from "@mui/lab";
interface UpdateProps {
  refresh: VoidFunction;
}
export default function SyncAllButton({ refresh }: UpdateProps) {
  const [loading, setLoading] = React.useState(false);
  const subject = React.useMemo(() => new RxSubject<null>(), []);
  const cancel = React.useCallback(() => {
    subject.next(null);
  }, [subject]);
  const update = React.useCallback(() => {
    setLoading(true);
    const sub = syncAll()
      .pipe(takeUntil(subject))
      .subscribe({
        next: () => {
          enqueueSnackbar(`Соглашения обновлены`, { variant: "info" });
          refresh();
        },
        complete: () => {
          setLoading(false);
        },
      });
    return () => {
      sub.unsubscribe();
    };
  }, [refresh, subject]);
  return (
    <Can I={Action.Create} a={Subject.Agreement}>
      <LoadingButton
        startIcon={<UpdateIcon />}
        size="small"
        variant="contained"
        color={loading ? "error" : "primary"}
        onClick={loading ? cancel : update}
      >
        {loading ? "Отмена" : `Обновить данные`}
      </LoadingButton>
    </Can>
  );
}
