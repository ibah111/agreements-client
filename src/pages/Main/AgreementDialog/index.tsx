import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import MonthPerDay from "./Form/MonthPerDay";
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
import Discount from "./Form/Maths/Discount";
import Type from "./Form/Type";
import Collector from "./Form/Collector";
import { useSnackbar } from "notistack";
import Sum from "./Form/Maths/Sum";
import Comment from "./Form/Comment";
import FullReq from "./Form/Maths/FullReq";
import findAllByPersonId from "../../../api/findAllByPersonId";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Car from "./Form/Car";
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

  const [res, setRes] = React.useState<number>();
  const [ids, setIds] = React.useState<number[]>();
  React.useEffect(() => {
    if (props.person.id)
      findAllByPersonId(props.person.id).subscribe((res) => {
        setRes(res.length);
        setIds(res.map((i) => i.id));
      });
  }, [enqueueSnackbar, props.person.id]);

  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => {
          handleClose();
          dispatch(resetAgreement());
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          alignSelf={"center"}
        >{`Данные из КСК по человеку. Кол-во соглашений на человека: ${res}.`}</DialogTitle>
        <Divider />

        {res! > 0 && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{`ID соглашений`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{`${ids}`}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
        <DialogContent sx={{ flexGrow: 1 }}>
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
            <MonthPerDay />
            <FullReq />
            {agreement.agreement_type === 2 && <Car />}

            <Sum />
            <Discount />
            <Divider />
            <RegDocType />
            {agreement.reg_doc === 2 && <Registator />}
            {agreement.reg_doc === 3 && <Archive />}
            <ActionsForGet />
            <ReceiptDt />
            <Collector />
            <Comment />
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
                enqueueSnackbar(`Соглашение успешно создано`, {
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
