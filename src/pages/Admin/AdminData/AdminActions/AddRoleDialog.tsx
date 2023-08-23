import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import useAsyncMemo from "../../../../utils/asyncMemo";
import getAllRoles from "../../../../api/TableApi's/Admin/getAllRoles";

interface AddRoleProps {
  refresh: VoidFunction;
  open: boolean;
  id_user: number;
}

export function AddRoleDialog(props: AddRoleProps) {
  const [value, setValue] = React.useState<number>(0);
  const roles = useAsyncMemo(getAllRoles, []);

  return (
    <>
      <Dialog open={props.open} onClose={props.refresh}>
        <DialogTitle>{`Дайте роль пользователю`}</DialogTitle>
        <DialogContent>
          <Select
            onChange={(event) => {
              setValue(Number(event.target.value));
            }}
          >
            <MenuItem value="">
              <em>Не выбрано</em>
            </MenuItem>
            {roles?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={() => {
              enqueueSnackbar(`Роль присвоена`);
            }}
          >{`Подтвердить`}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
