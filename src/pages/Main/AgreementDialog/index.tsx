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
import ContactID from "./DisableForm/ContactID";
import ContactFIO from "./DisableForm/ContactFIO";
import DateAgr from "./Form/DateAgr";
import BirthDate from "./DisableForm/BirthDate";
import { Person } from "@contact/models";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
  person: Person;
}
export default function AgreementDialog(props: CreateAgreementDialogProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogContent sx={{ flexGrow: 1 }}>
          <DialogTitle alignSelf={"center"}>Контакт базовые данные</DialogTitle>
          <Grid item container spacing={1}>
            <ContactID person={props.person} />
            <ContactFIO person={props.person} />
            <BirthDate person={props.person} />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogTitle alignSelf={"center"}>
          Запишите дополнительные данные
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <DateAgr />
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
            color="error"
            variant="contained"
            sx={{ width: "auto", alignSelf: "center" }}
            onClick={props.onClose}
          >
            Назад
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            fullWidth
          >
            Создать
          </Button>
        </DialogActions>
        <Grid item>
          <SearchDialog open={open} onClose={handleClose} />
        </Grid>
      </Dialog>
    </>
  );
}
