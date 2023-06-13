import { Dialog } from "@mui/material";
import { diff } from "deep-object-diff";
import React from "react";
import { map } from "rxjs";
import editAgremeent from "../../../api/editAgreement";
import { AgreementInstance } from "../../../Reducer/Agreement/AgreementInstance";
interface PromiseAgreements {
  oldRow: AgreementInstance;
  newRow: AgreementInstance;
  resolve: (value: AgreementInstance) => void;
  reject: (e: unknown) => void;
}
export default function useRowUpdater() {
  const [promiseArguments, setPromiseArguments] =
    React.useState<PromiseAgreements | null>(null);
  const [open, setOpen] = React.useState(false);
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
          .pipe(map(() => newRow))
          .subscribe({ next: resolve, error: reject });
      });
    },
    []
  );
  const RenderDialog = React.useCallback(
    () => (
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          promiseArguments?.resolve(promiseArguments.oldRow);
        }}
      ></Dialog>
    ),
    [open, promiseArguments]
  );
  return { processRowUpdate, RenderDialog };
}
