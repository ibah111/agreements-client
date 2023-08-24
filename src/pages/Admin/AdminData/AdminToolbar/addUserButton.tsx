import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import addUser from "../../../../api/TableApi's/Admin/addUser";
import { enqueueSnackbar } from "notistack";
interface BottomProps {
  refresh: VoidFunction;
}
export default function AddUserButton(props: BottomProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const condition = () => {
    if (value) return false;
    return true;
  };
  return (
    <>
      <Button
        startIcon={<PersonAddAltIcon />}
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >{`Добавить пользователя`}</Button>
      {open && (
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>{`Введите логин нового пользователя`}</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid>
              <Grid>
                <TextField
                  value={value}
                  onChange={(event) => {
                    setValue(String(event.target.value));
                  }}
                />
              </Grid>
              <Grid>
                <Button
                  disabled={condition()}
                  onClick={() => {
                    addUser({
                      login: value,
                    }).subscribe(() => {
                      enqueueSnackbar("Пользователь добавлен", {
                        variant: "success",
                        autoHideDuration: 1000,
                      });
                      setOpen(false);
                      props.refresh();
                    });
                  }}
                >{`Добавить`}</Button>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
        </Dialog>
      )}
    </>
  );
}
