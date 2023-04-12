import { Grid, Typography } from "@mui/material";
import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import { enqueueSnackbar } from "notistack";
import React from "react";
import editAgremeent from "../../../api/editAgreement";
import getAgreements from "../../../api/getAgreement";
import getPurposes from "../../../api/getPurpose";
import { Agreement } from "../../../Models/Agreement";
import useAsyncMemo from "../../../utils/asyncMemo";
import getColumns from "./DataTable/column.data";

export default function AgreementTable() {
  const [agreements, setAgreements] = React.useState<Agreement[]>([]);
  const refresh = React.useCallback(() => {
    getAgreements().then((res) => {
      setAgreements(res);
    });
  }, []);
  const purposes = useAsyncMemo(getPurposes, []);
  const columns = React.useMemo(
    () => getColumns(refresh, purposes!),
    [refresh, purposes]
  );
  React.useEffect(() => {
    refresh();
  }, [refresh]);
  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    left: ["id", "FIO", "KD", "conclusion_date", "r_law_act_id"],
    right: ["actions"],
  });
  const handlePinnedColumnsChange = React.useCallback(
    (updatedPinnedColumns: GridPinnedColumns) => {
      setPinnedColumns(updatedPinnedColumns);
    },
    []
  );

  return (
    <Grid item container xs direction={"column"}>
      <Grid item style={{ margin: "3px" }}>
        <Typography variant="h5">Таблица соглашений</Typography>
      </Grid>
      <Grid item xs style={{ height: 400, width: "100%" }}>
        <DataGridPremium
          columns={columns}
          rows={agreements}
          processRowUpdate={async (newRow: Agreement, oldRow: Agreement) => {
            const data = await editAgremeent(newRow, oldRow);
            enqueueSnackbar("Изменено", { variant: "success" });
            return data;
          }}
          pinnedColumns={pinnedColumns}
          onPinnedColumnsChange={handlePinnedColumnsChange}
        />
      </Grid>
    </Grid>
  );
}
