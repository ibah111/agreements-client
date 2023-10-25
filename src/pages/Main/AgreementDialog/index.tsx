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
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MonthPerDay from "./Form/MonthPerDay";
import TaskLink from "./Form/TaskLink";
import PersonID from "./DisableForm/PersonID";
import PersonFIO from "./DisableForm/PersonFIO";
import BirthDate from "./DisableForm/BirthDate";
import { Person, PersonProperty } from "@contact/models";
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
import useAgreementForm from "./useAgreementForm";
import useAgreementData from "../../../Hooks/useAgreementData";
import useAsyncMemo from "../../../utils/asyncMemo";
import getPersonPropertyParam from "../../../api/PersonPropertiesLink/getPersonPropertyParam";
import RefreshIcon from "@mui/icons-material/Refresh";
// import OneDayPaymentDate from "./Form/OneDayPaymentDate";

export enum AgreementCreateEvents {
  onOpenCar = "onOpenCar",
}
export class AgreementEventDialog<
  Value = number | string | object
> extends Event {
  constructor(type: AgreementCreateEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
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

  const AgreementDialogTarget = React.useMemo(() => new EventTarget(), []);
  const carDialog = useAgreementForm({
    id_person: props.person.id,
    DialogTarget: AgreementDialogTarget,
    onClose: () => props?.onClose(),
  });

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
          <Tooltip title="Сбросить данные">
            <IconButton
              onClick={() => {
                dispatch(resetAgreement());
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <ConclusionDate />
            <Type />
            <StatusAgreementType />
            <FinishDate />
            <MonthPerDay />
            {/* {agreement.month_pay_day !== null && <OneDayPaymentDate />} */}
            {[2, 5].includes(agreement.agreement_type) && (
              <Car
                eventTarget={AgreementDialogTarget}
                id_person={props.person.id}
              />
            )}
            <FullReq />
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
      {carDialog.openCar && (
        <CarDialog
          open={carDialog.openCar}
          onClose={carDialog.closeCarDialog}
          id_person={props.person.id}
        />
      )}
    </>
  );
}

interface CarDialogProps {
  open: boolean;
  onClose: VoidFunction;
  id_person: number;
}
function CarDialog(props: CarDialogProps) {
  const properties = useAsyncMemo(
    () => getPersonPropertyParam(props.id_person),
    [props.id_person],
    []
  );
  const agreement_type = useAppSelector(
    (state) => state.Agreement.agreement_type
  );
  const data = useAgreementData("car", { agreement_type });

  const valueCarGetter = (
    person_properties: PersonProperty[],
    key_id: number
  ): string => {
    const items = person_properties.map((item) => {
      function itemFind(rr_id: number) {
        return (
          item.PersonPropertyParams?.find(
            (i) =>
              i.r_property_typ_params_id === rr_id && i.parent_id === key_id
          )?.value || ""
        );
      }

      const name = itemFind(7);
      const vin = itemFind(6);
      const govNumber = itemFind(5);
      const carType = itemFind(47);
      const idk = itemFind(3);
      return name + " " + vin + " " + govNumber + " " + carType + " " + idk;
    });
    return items.reduce((p, c) => p + c);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>Выберите машину</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={1}>
          <FormControl fullWidth>
            <Select
              onChange={(event) => {
                data.onChange(String(event.target.value));
              }}
            >
              <MenuItem value={""}>Не выбрано / Имущества нет</MenuItem>
              {properties.map((item) => (
                <MenuItem
                  key={item.id}
                  value={valueCarGetter(properties, item.id)}
                >
                  {valueCarGetter(properties, item.id)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                props.onClose();
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
