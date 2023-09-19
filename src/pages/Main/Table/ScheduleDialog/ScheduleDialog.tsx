import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React from "react";
import ScheduleForm from "./ScheduleForm";
import useScheduleTable from "./ScheduleDataGrid/useScheduleTable";
import {
  DataGridPremium,
  GRID_AGGREGATION_FUNCTIONS,
  GridAggregationFunction,
  GridAggregationModel,
} from "@mui/x-data-grid-premium";
import useUpdateFormControl from "./ScheduleDataGrid/UpdateForm/useUpdateFormControl";
import DetailPage from "./ScheduleDataGrid/DetailPanelContent/DetailPage";
import ScheduleToolbar from "./ScheduleDataGrid/ScheduleProps/ScheduleToolbar";
import UpdateForm from "./ScheduleDataGrid/UpdateForm/UpdateForm";
import { enqueueSnackbar } from "notistack";
import editPayment from "../../../../api/SchedulePayments/editPayment";

interface ScheduleDialogProps {
  id: number;
  open: boolean;
  onClose: VoidFunction;
  DialogTarget: EventTarget;
}
export class ScheduleEventsClass<
  Value = number | string | object
> extends Event {
  constructor(type: ScheduleEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export enum ScheduleEvents {
  onEditPayment = "onEditPayment",
}

export default function ScheduleDialog(props: ScheduleDialogProps) {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { rows, loading, refresh, columns } = useScheduleTable(
    props.id,
    DialogTarget
  );
  const check_rows = () => {
    if (!rows) return [];
    else return rows;
  };

  const updateControls = useUpdateFormControl({
    DialogTarget,
    onClose: () => {
      refresh();
    },
  });

  const booleanCount: GridAggregationFunction<boolean | number> = {
    label: "Осталось",
    apply: (params) => {
      const falseArr = params.values.filter((i) => i === false).length;

      return falseArr;
    },
  };

  const [aggregationModel, setAggregationModel] =
    React.useState<GridAggregationModel>({
      sum_owe: "sum",
      sum_left: "sum",
      status: "booleanCount",
    });
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
        <DialogTitle>{`График платежей / Внесенные платежи / ID графика ${props.id}`}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <ScheduleForm
              id_schedule={props.id}
              DialogTarget={props.DialogTarget}
              refresh={refresh}
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Grid>
            <DataGridPremium
              columnVisibilityModel={{
                id: false,
                id_agreement: false,
              }}
              disableColumnPinning
              disableRowGrouping
              columns={columns}
              rows={check_rows()}
              loading={loading}
              getDetailPanelHeight={() => "auto"}
              sx={{
                flex: 1,
                height: 600,
              }}
              getDetailPanelContent={(param) => (
                <DetailPage id_payment={param.row.id!} />
              )}
              slots={{
                toolbar: ScheduleToolbar,
              }}
              slotProps={{
                toolbar: { refresh: refresh, id_schedule: props.id },
              }}
              processRowUpdate={(newValue, oldValue) => {
                editPayment(oldValue.id as number, {
                  pay_day: newValue.pay_day,
                  sum_owe: newValue.sum_owe,
                }).subscribe(() =>
                  enqueueSnackbar(`Изменено`, {
                    variant: "info",
                  })
                );
                return newValue;
              }}
              onProcessRowUpdateError={(e) => {
                enqueueSnackbar(`Возникла ошибка ${e}`, { variant: "error" });
              }}
              aggregationFunctions={{
                ...GRID_AGGREGATION_FUNCTIONS,
                booleanCount: booleanCount,
              }}
              aggregationModel={aggregationModel}
              onAggregationModelChange={setAggregationModel}
            />
            {updateControls.open && (
              <UpdateForm
                open={updateControls.open}
                id_payment={updateControls.paymentId}
                refresh={updateControls.closeDialog}
              />
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
