import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import getAgreements from "../../api/getAgreement";
import getColumns from "./column.data";
import { Agreement } from "./row.data";

export default function AgreementTable() {
  const [agreements, setAgreements] = React.useState<Agreement[]>([]);
  function refresh() {
    getAgreements().then(setAgreements);
  }

  const columns = getColumns(refresh);
  return (
    <Grid item container xs direction={"column"}>
      <Grid item>
        <Typography variant="h5">Таблица соглашений</Typography>
      </Grid>
      <Grid item xs>
        <DataGrid columns={columns} rows={agreements} />
      </Grid>
    </Grid>
  );
}
