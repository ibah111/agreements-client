import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import { diff } from "deep-object-diff";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { tap } from "rxjs";
import editAgremeent from "../../../api/editAgreement";
import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";
interface PromiseAgreements {
  oldRow: AgreementInstance;
  newRow: AgreementInstance;
  resolve: (value: AgreementInstance) => void;
  reject: (e: unknown) => void;
}

export default function useRowUpdater(refresh: () => void) {
  const [promiseArguments, setPromiseArguments] =
    React.useState<PromiseAgreements | null>(null);
  const [open, setOpen] = React.useState(false);
  const [newDate, setDate] = React.useState<null | moment.Moment>(null);

  const processRowUpdate = React.useCallback(
    (newRow: AgreementInstance, oldRow: AgreementInstance) => {
      return new Promise<AgreementInstance>((resolve, reject) => {
        setPromiseArguments({ oldRow, newRow, resolve, reject });
        const changed = diff(oldRow, newRow) as AgreementInstance;
        if (changed?.statusAgreement === 3) {
          setOpen(true);
          return;
        }
        editAgremeent(newRow, oldRow)
          .pipe(
            tap(() => {
              enqueueSnackbar(`Изменения внесены`, {
                variant: "success",
              });
              // refresh();
            })
          )
          .subscribe({
            next: resolve,
            error: reject,
          });
      });
    },
    [
      /*
       * refresh()
       */
    ]
  );
  const updateConclusionDate = React.useCallback(() => {
    const data = { ...promiseArguments!.newRow, finish_date: newDate };
    editAgremeent(data, promiseArguments!.oldRow).subscribe({
      next: () => promiseArguments!.resolve(data),
      error: promiseArguments!.reject,
    });
    setOpen(false);
  }, [newDate, promiseArguments]);
  const RenderDialog = React.useMemo(
    () => (
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          promiseArguments?.resolve(promiseArguments.oldRow);
        }}
      >
        <DialogTitle>Введите дату заключения</DialogTitle>
        <DialogContent>
          <DatePicker
            minDate={moment().year(2000)}
            maxDate={moment()}
            onChange={(newValue) => {
              setDate(newValue as moment.Moment);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateConclusionDate}>Подтвердить</Button>
        </DialogActions>
      </Dialog>
    ),
    [open, promiseArguments, updateConclusionDate]
  );
  return { processRowUpdate, RenderDialog };
}
