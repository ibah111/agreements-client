import { useAppDispatch, useAppSelector } from "../Reducer";
import { useSnackbar } from "notistack";
import React from "react";
import { resetMessage } from "../Reducer/Message";

interface MessageProviderProps {
  children: React.ReactNode;
}
export default function MessageProvider({ children }: MessageProviderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.Message);
  React.useEffect(() => {
    for (const message of messages) {
      enqueueSnackbar(message.message, message.options);
    }
    dispatch(resetMessage());
  }, [enqueueSnackbar, dispatch, messages]);
  return <>{children}</>;
}
