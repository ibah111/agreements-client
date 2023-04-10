import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import useSearchTable from "../SearchDialog/useSearchTable";
import FormAgr from "./FormAgr";
interface AddAgrProps {
  open: boolean;
  onClose: () => void;
}

export default function AddAgr(props: AddAgrProps) {
  // ? Мужики не трогайте open, пожалуйста, без него вылезает ошибка
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(false);
  const { refresh } = useSearchTable(setOpen);
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
        <DialogTitle alignSelf={"center"}>Внесите данные</DialogTitle>
        <DialogContent>
          <Grid container direction={"column"} sx={{ height: "auto" }}>
            <Grid item container alignItems={"center"} spacing={1} xs={1}>
              <FormAgr refresh={refresh} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
