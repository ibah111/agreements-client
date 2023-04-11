import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React from "react";
import SearchDialog from "../SearchDialog";
import MonthPerDay from "./Form/MonthPerDay";
import Purpose from "./Form/Purpose";
import CourtSum from "./Form/CourtSum";
import DebtSum from "./Form/DebtSum";
import RecalculationSum from "./Form/RecalculationSum";
import Discount from "./Form/Discount";
import Comment from "./Form/Comment";
import TaskLink from "./Form/TaskLink";
import RegDoc from "./Form/RegDoc";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function AgreementDialog(props: CreateAgreementDialogProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle alignSelf={"center"}>
          Запишите дополнительные данные
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("Console");
              }
            }}
          >
            <Purpose open={open} onClose={handleClose} />
            <CourtSum />
            <DebtSum />
            <RecalculationSum />
            <Discount />
            <MonthPerDay />
            <Comment />
            <TaskLink />
            <RegDoc />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            sx={{ width: "auto", alignSelf: "center" }}
            onClick={props.onClose}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            onClick={handleOpen}
          >
            next
          </Button>
        </DialogActions>
        <Grid item>
          <SearchDialog open={open} onClose={handleClose} />
        </Grid>
      </Dialog>
    </>
  );
}
