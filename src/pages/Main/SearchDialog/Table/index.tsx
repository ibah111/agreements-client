import { Debt } from "@contact/models";
import {
  DataGridPremium,
  GridColDef,
  GridPinnedColumns,
} from "@mui/x-data-grid-premium";
import { enqueueSnackbar } from "notistack";
import React from "react";
import createAgreement from "../../../../api/createAgreement";
import { useAppSelector } from "../../../../Reducer";

interface TableProps {
  columns: GridColDef<Debt>[];
  rows: Debt[];
  loading: boolean;
}

export default function Table(props: TableProps) {
  const [pinnedColumns] = React.useState<GridPinnedColumns>({
    right: ["actions"],
  });
  const agreement = useAppSelector((state) => state.Agreement);
  return (
    <DataGridPremium
      columns={props.columns}
      rows={props.rows}
      loading={props.loading}
      pinnedColumns={pinnedColumns}
      onCellDoubleClick={async () => {
        await createAgreement(agreement);
        enqueueSnackbar("Успешно создано", { variant: "success" });
      }}
    />
  );
}
