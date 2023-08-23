import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  Button,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";

export function DeleteUserDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>{`Вы хотите удалить пользователя`}</DialogTitle>
        <DialogContent>
          <Select />
          <Button
            onClick={() => {
              setOpen(false);
              enqueueSnackbar(`Пользователь удален`);
            }}
          >{`Подтвердить`}</Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >{`Отменить`}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
