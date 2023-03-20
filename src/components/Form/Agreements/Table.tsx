import { Grid, Typography } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import editAgremeent from "../../../api/editAgreement";
import getAgreements from "../../../api/getAgreement";
import { Agreement } from "../../../Reducer/Agreement";
import getColumns from "./DataTable/column.data";

export default function AgreementTable() {
  const [agreements, setAgreements] = React.useState<Agreement[]>([]);
  const refresh = React.useCallback(() => {
    getAgreements().then(setAgreements);
  }, []);

  const columns = getColumns(refresh);
  React.useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <Grid item container xs direction={"column"}>
      <Grid item>
        <Typography variant="h5">Таблица соглашений</Typography>
      </Grid>
      <Grid item xs>
        <DataGridPremium
          columns={columns}
          rows={agreements}
          onCellEditCommit={editAgremeent}
        />
      </Grid>
    </Grid>
  );
}
