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
export default function AddUserButton() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const condition = () => {
    if (value) return true;
    return false;
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
