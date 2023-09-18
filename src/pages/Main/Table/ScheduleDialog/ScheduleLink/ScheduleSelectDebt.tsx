import { Debt } from "@contact/models";
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
import { enqueueSnackbar } from "notistack";
import useAsyncMemo from "../../../../../utils/asyncMemo";
import getAvailableSchedulesForSchedule from "../../../../../api/SchedulePayments/getAvailableSchedulesForSchedule";
import createScheduleLinks from "../../../../../api/SchedulePayments/createScheduleLink";
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
  const type = useAsyncMemo(getAllScheduleTypes, []);

  const [numberType, setNumberType] = React.useState<number>(0);

  function typeCondition(value: number) {
    if (value !== 2) return true;
  }

  const [debtId, setDebtId] = React.useState<number>(0);
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle>{`Привязать`}</DialogTitle>
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
                    console.log(event.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>Не выбрано или не найден долг</em>
                  </MenuItem>
                  {debt.map((i) => (
                    <MenuItem key={i.id} value={i.id}>
                      {i.name}
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
              variant="contained"
              onClick={(event) => {
                /**
                 * ApiCall
                 */
                createScheduleLinks({
                  id_agreement: props.id_agreement,
                  schedule_type: numberType,
                  id_debt: debtId,
                }).subscribe(() => props.onClose);
              }}
            >{`PROP`}</Button>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
