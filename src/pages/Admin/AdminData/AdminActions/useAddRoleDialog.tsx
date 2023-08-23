import React from "react";
import { AdminEventDialog, AdminEvents } from "../AdminTable";

interface useAddRoleDialogOpts {
  DialogTarget: EventTarget;
  refresh: VoidFunction;
}
export default function useAddRoleDialog(options?: useAddRoleDialogOpts) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<number>(0);
  /**
   * RENDER
   */
  React.useEffect(() => {
    const callback = ((e: AdminEventDialog) => {
      setUserId(e.value as number);
      setOpen(true);
    }) as EventListener;
    options?.DialogTarget.addEventListener(
      AdminEvents.onAddRoleDialog,
      callback
    );
    return () =>
      options?.DialogTarget.removeEventListener(
        AdminEvents.onAddRoleDialog,
        callback
      );
  }, [options?.DialogTarget]);
  const closeAddRoleDialog = React.useCallback(() => {
    setUserId(0);
    setOpen(false);
    options?.refresh();
  }, [options]);
  return { closeAddRoleDialog, open, userId };
}
