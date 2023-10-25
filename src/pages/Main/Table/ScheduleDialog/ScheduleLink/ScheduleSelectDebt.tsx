import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import getAllScheduleTypes from "../../../../../api/SchedulePayments/getAllScheduleTypes";
import useAsyncMemo from "../../../../../utils/asyncMemo";
import getAvailableSchedulesForSchedule from "../../../../../api/SchedulePayments/getAvailableSchedulesForSchedule";
import createScheduleLinks from "../../../../../api/SchedulePayments/createScheduleLink";
import { enqueueSnackbar } from "notistack";
import getCourtDocs from "../../../../../api/SchedulePayments/getCourtDocs";
interface Props {
  open: boolean;
  onClose: VoidFunction;
  id_agreement: number;
}
export function ScheduleSelectDebt(props: Props) {
  const debt = useAsyncMemo(
    () => getAvailableSchedulesForSchedule(props.id_agreement),
    [],
    []
  );
  const type = useAsyncMemo(() => getAllScheduleTypes(props.id_agreement), []);

  const [numberType, setNumberType] = React.useState<number>(0);

  const typeCondition = React.useCallback((value: number) => {
    if (value !== 2) return true;
  }, []);
  const [debtId, setDebtId] = React.useState<number>(0);

  const contract = React.useMemo(
    () => debt.find((i) => i.id === debtId)?.contract,
    [debt, debtId]
  );

  const buttonCondition = React.useCallback((type: number, id: number) => {
    if (!type) return true;
    if (type === 1 || (type === 2 && id)) return false;
    if (type === 2) return true;
  }, []);

  const [courtDocNum, setCourtDocNum] = React.useState<string>("");

  const courtDocsNums = useAsyncMemo(() => getCourtDocs(debtId), [], []);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle>Привязать</DialogTitle>
      <Divider />
      <DialogContent>
        {/**
         * GridStart
         */}
        <Grid container spacing={1}>
          {/**
           * ScheduleType
           */}
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="schedule-type-label">Тип графика</InputLabel>
              <Select
                labelId="schedule-type-label"
                label="Тип графика"
                onChange={(event) => {
                  setNumberType(Number(event.target.value));
                }}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                {type?.map((i) => (
                  <MenuItem key={i.id} value={i.id}>
                    {i.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/**
           * Debt
           */}
          <Grid item xs>
            {numberType === 2 && (
              <FormControl fullWidth>
                <InputLabel id="debt-label">Долг</InputLabel>
                <Select
                  disabled={typeCondition(numberType)}
                  labelId="debt-label"
                  label="Debt"
                  onChange={(event) => {
                    setDebtId(Number(event.target.value));
                  }}
                >
                  <MenuItem value="">
                    <em>Не выбрано или не найден долг</em>
                  </MenuItem>
                  {debt.map((i) => (
                    <MenuItem key={i.id} value={i.id}>
                      ID долга: {i.id} , Имя: {i.name} , КД: {i.contract} , Имя
                      продукта: {i.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          {/**
           * CourtDoc
           */}
          <Grid item xs>
            {numberType === 2 && (
              <FormControl fullWidth>
                <InputLabel id="court-doc-num-label">
                  Гражданское дело
                </InputLabel>
                <Select
                  disabled={typeCondition(numberType)}
                  labelId="court-doc-num-label"
                  label="court_doc_num"
                  onChange={(event) => {
                    setCourtDocNum(String(event.target.value));
                  }}
                >
                  <MenuItem value="">
                    <em>Не выбрано или не найден долг</em>
                  </MenuItem>
                  {courtDocsNums.map((i) => (
                    <MenuItem
                      key={i.id}
                      value={i.court_doc_num || "*Номера нет*"}
                    >
                      ID долга: {i.id} Гражданское дело: {i.court_doc_num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          {/**
           * End of grid
           */}
        </Grid>
        <DialogActions>
          <Grid
            sx={{
              alignSelf: "right",
            }}
          />
          <Grid container item>
            <Button
              disabled={buttonCondition(numberType, debtId)}
              variant="contained"
              onClick={() => {
                createScheduleLinks({
                  id_agreement: props.id_agreement,
                  schedule_type: numberType,
                  id_debt: debtId,
                  contract: contract,
                  court_doc_num: courtDocNum,
                }).subscribe(() => {
                  enqueueSnackbar("Создано", {
                    variant: "success",
                  });
                  props.onClose();
                });
              }}
            >{`Создать`}</Button>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
