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
import MonthPerDay from "./Form/MonthPerDay";
import PurposeField from "./Form/Purpose";
import TaskLink from "./Form/TaskLink";
import PersonID from "./DisableForm/PersonID";
import PersonFIO from "./DisableForm/PersonFIO";
import BirthDate from "./DisableForm/BirthDate";
import { Person } from "@contact/models";
import ConclusionDate from "./Form/ConclusionDate";
import createAgreement from "../../../api/createAgreement";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { resetAgreement } from "../../../Reducer/Agreement/Agreement";
import ActionsForGet from "./Form/ActionsForGet";
import FinishDate from "./Form/FinishDate";
import ReceiptDt from "./Form/ReceiptDt";
import RegDocType from "./Form/RegDoc";
import StatusAgreementType from "./Form/StatusAgreement";
import Registator from "./Form/Registator";
import Archive from "./Form/Archive";
import Discount from "./Form/Discount";
import Type from "./Form/Type";
import Collector from "./Form/Collector";
import { useSnackbar } from "notistack";
import Sum from "./Form/Sum";
import Comment from "./Form/Comment";
import FullReq from "./Form/FullReq";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
  person: Person;
  fullClose: VoidFunction;
}
export function CloseAll() {
  const closeAll = React.useCallback(() => {}, []);
  return closeAll;
}
export default function AgreementDialog(props: CreateAgreementDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();

  const handleClose = React.useCallback(() => {
    dispatch(resetAgreement());
    props.onClose();
  }, [dispatch, props]);

  const handleFullClose = React.useCallback(() => {
    dispatch(resetAgreement());
    props.fullClose();
  }, [dispatch, props]);
  return (
    <>
      <Dialog open={props.open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent sx={{ flexGrow: 1 }}>
          <DialogTitle alignSelf={"center"}>Контакт базовые данные</DialogTitle>
          <Grid item container spacing={1}>
            <PersonID person={props.person} />
            <PersonFIO person={props.person} />
            <BirthDate person={props.person} />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogTitle alignSelf={"center"}>
          {`Запишите данные соглашения`}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <ConclusionDate />
            <Type />
            <StatusAgreementType />
            <FinishDate />
            <PurposeField />
            <MonthPerDay />
            <FullReq />
            <Sum />
            <Discount />
            <Divider />
            <RegDocType />
            {agreement.new_reg_doc === 2 && <Registator />}
            {agreement.new_reg_doc === 3 && <Archive />}
            <ActionsForGet />
            <Comment />
            <Collector />
            <ReceiptDt />
            <TaskLink />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            sx={{ width: "auto", alignSelf: "center" }}
            onClick={handleClose}
          >
            Назад
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            fullWidth
            onClick={async () => {
              createAgreement(agreement).subscribe(() => {
                enqueueSnackbar(`Соглашение ${agreement.id} успешно создано`, {
                  variant: "success",
                });
                handleFullClose();
              });
            }}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
