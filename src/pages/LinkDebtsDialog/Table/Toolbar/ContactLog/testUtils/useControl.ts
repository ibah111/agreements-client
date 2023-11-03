import { enqueueSnackbar } from "notistack";
import React from "react";

export enum keysEnum {
  phoneOpen = "phoneOpen",
  guarantorOpen = "guarantorOpen",
}

export class EventUseControl<Value = number | string | object> extends Event {
  constructor(type: keysEnum | string, value?: Value) {
    super(type);
    this.value = value;
  }
  value?: Value;
}

interface useControlOpts {
  DialogTarget: EventTarget;
  onClose: VoidFunction;
}

class ControlClass {
  openState: boolean;
  onClose: VoidFunction;
  value?: number | string | object;
}

export default function useControlFunction(
  triggerKey: keysEnum,
  opts: useControlOpts
): ControlClass {
  const [openState, setOpenState] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((e: EventUseControl) => {
      setOpenState(true);
      setValue(e.value as number);
    }) as EventListener;
    opts?.DialogTarget.addEventListener(triggerKey, callback);
  }, [opts?.DialogTarget, triggerKey]);

  const onClose = React.useCallback(() => {
    setOpenState(false);
    setValue(0);
    opts?.onClose();
  }, [opts]) as VoidFunction;

  return {
    onClose,
    openState,
    value,
  };
}

export const openSnackbar = (text: string) =>
  enqueueSnackbar(text, {
    autoHideDuration: 500,
    variant: "info",
    preventDuplicate: true,
  });
/**
 * функция триггера события
 * передавать ее в места onClick'a
 * @param eventTarget
 * @param triggerKey
 * @param value
 */
export const triggerEvent = (
  eventTarget: EventTarget,
  triggerKey: string,
  value?: string | number | object
) => {
  openSnackbar(`Открываю: ${triggerKey}`);
  return eventTarget.dispatchEvent(new EventUseControl(triggerKey, value));
};
