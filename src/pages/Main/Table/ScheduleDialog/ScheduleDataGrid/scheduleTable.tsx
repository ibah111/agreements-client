import { DataGridPremium } from "@mui/x-data-grid-premium";
import useScheduleTable from "./useScheduleTable";
import ScheduleToolbar from "./ScheduleToolbar/ScheduleToolbar";
import DetailPage from "./DetailPanelContent/DetailPage";
import React from "react";
import useUpdateFormControl from "./Edit/useEdit";
import UpdateForm from "./Edit/EditForm";

export class ScheduleEventsClass<
  Value = number | string | object
> extends Event {
  constructor(type: ScheduleEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}

interface ScheduleProps {
  id_agreement: number;
  refresh: VoidFunction;
}

export enum ScheduleEvents {
  onEditPayment = "onEditPayment",
}

export default function ScheduleTable(props: ScheduleProps) {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const { rows, loading, refresh, columns } = useScheduleTable(
    props.id_agreement
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

  return (
    <>
      <DataGridPremium
        columnVisibilityModel={{
          id: false,
          id_agreement: false,
        }}
        disableColumnPinning
        disableAggregation
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
          toolbar: { refresh },
        }}
      />
      <UpdateForm
        id_payment={updateControls.paymentId}
        open={updateControls.open}
        refresh={updateControls.closeDialog}
      />
    </>
  );
}
