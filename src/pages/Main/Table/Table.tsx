import { Grid, Typography } from "@mui/material";
import { DataGridPremium, GridPinnedColumns } from "@mui/x-data-grid-premium";
import { enqueueSnackbar } from "notistack";
import React from "react";
import editAgremeent from "../../../api/editAgreement";
import getAgreements from "../../../api/getAgreement";
import getPurposes from "../../../api/getPurpose";
import { Agreement } from "../../../Models/Agreement";
import useAsyncMemo from "../../../utils/asyncMemo";
import SearchDialog from "../SearchDialog";
import getColumns from "./DataTable/column.data";
import DebtConnection from "./Functions/DebtConnection";
import AgreementTableToolbar from "./ToolBar/Toolbar";

export default function AgreementTable() {
  const [agreements, setAgreements] = React.useState<Agreement[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    getAgreements().subscribe((res) => {
      setAgreements(res);
      setLoading(false);
    });
  }, []);

  const [openDebtConnection, setOpenDebtConnection] = React.useState(false);
  const handleOpenDebtConnection = React.useCallback(() => {
    setOpenDebtConnection(true);
  }, []);

  const purposes = useAsyncMemo(getPurposes, []);
  const columns = React.useMemo(
    () => getColumns(refresh, purposes!, handleOpenDebtConnection),
    [refresh, purposes, handleOpenDebtConnection]
  );

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    refresh();
    setOpen(false);
    setOpenDebtConnection(false);
  }, [refresh]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const [pinnedColumns, setPinnedColumns] = React.useState<GridPinnedColumns>({
    left: [
      "id",
      "personId",
      "FIO",
      "KD",
      "conclusion_date",
      "debt_id",
      "r_law_act_id",
    ],
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
          loading={loading}
          slots={{ toolbar: AgreementTableToolbar }}
          slotProps={{
            toolbar: { refresh, handleOpen },
          }}
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
      {open && <SearchDialog open={open} onClose={handleClose} />}
      {openDebtConnection && (
        <DebtConnection open={openDebtConnection} onClose={handleClose} />
      )}
    </Grid>
  );
}
